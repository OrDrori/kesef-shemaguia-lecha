#!/usr/bin/env python3
"""
Verify all URLs in the project
Checks HTTP status codes and reports broken links
"""

import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Dict, List, Tuple
import time

# Read URLs from file
with open('urls_to_verify.txt', 'r') as f:
    urls = [line.strip() for line in f if line.strip()]

def check_url(url: str) -> Tuple[str, int, str]:
    """Check if URL is accessible"""
    try:
        # Set timeout and user agent
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.head(url, timeout=10, headers=headers, allow_redirects=True)
        
        # If HEAD fails, try GET
        if response.status_code >= 400:
            response = requests.get(url, timeout=10, headers=headers, allow_redirects=True)
        
        return (url, response.status_code, 'OK' if response.status_code < 400 else 'ERROR')
    except requests.exceptions.Timeout:
        return (url, 0, 'TIMEOUT')
    except requests.exceptions.ConnectionError:
        return (url, 0, 'CONNECTION_ERROR')
    except Exception as e:
        return (url, 0, f'ERROR: {str(e)}')

print(f"🔍 Checking {len(urls)} URLs...\n")

results: List[Tuple[str, int, str]] = []

# Check URLs in parallel
with ThreadPoolExecutor(max_workers=5) as executor:
    futures = {executor.submit(check_url, url): url for url in urls}
    
    for i, future in enumerate(as_completed(futures), 1):
        url, status, message = future.result()
        results.append((url, status, message))
        
        # Print progress
        emoji = '✅' if status < 400 and status > 0 else '❌'
        print(f"{emoji} [{i}/{len(urls)}] {status} - {url}")
        
        # Small delay to be nice to servers
        time.sleep(0.1)

# Summary
print("\n" + "="*80)
print("📊 SUMMARY")
print("="*80)

working = [r for r in results if r[1] < 400 and r[1] > 0]
broken = [r for r in results if r[1] >= 400 or r[1] == 0]

print(f"\n✅ Working: {len(working)}/{len(urls)}")
print(f"❌ Broken: {len(broken)}/{len(urls)}")

if broken:
    print("\n🔴 BROKEN LINKS:")
    for url, status, message in broken:
        print(f"  - {url}")
        print(f"    Status: {status} - {message}")

# Save results
with open('url_verification_results.txt', 'w') as f:
    f.write("URL Verification Results\n")
    f.write("="*80 + "\n\n")
    
    f.write(f"Working: {len(working)}/{len(urls)}\n")
    f.write(f"Broken: {len(broken)}/{len(urls)}\n\n")
    
    if broken:
        f.write("BROKEN LINKS:\n")
        for url, status, message in broken:
            f.write(f"  {url}\n")
            f.write(f"    Status: {status} - {message}\n\n")
    
    f.write("\nFULL RESULTS:\n")
    for url, status, message in sorted(results, key=lambda x: x[1]):
        f.write(f"{status} - {url} - {message}\n")

print(f"\n💾 Results saved to: url_verification_results.txt")
