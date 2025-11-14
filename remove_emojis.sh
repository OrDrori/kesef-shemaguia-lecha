#!/bin/bash
# Script to remove all emojis from the project

cd /home/ubuntu/kesef-shemaguia-lecha/client/src

# Remove emojis from titles and text
find . -name "*.tsx" -o -name "*.ts" | while read file; do
  # Remove sparkles ✨
  sed -i 's/ ✨//g' "$file"
  
  # Remove target 🎯
  sed -i 's/ 🎯//g' "$file"
  sed -i 's/🎯 //g' "$file"
  
  # Remove money 💰
  sed -i 's/💰 //g' "$file"
  sed -i 's/ 💰//g' "$file"
  sed -i 's/💰💰//g' "$file"
  
  # Remove heart 💚
  sed -i 's/ 💚//g' "$file"
  sed -i 's/💚 //g' "$file"
  
  # Remove phone 📱
  sed -i 's/ 📱//g' "$file"
  sed -i 's/📱 //g' "$file"
  
  # Remove chart 📊
  sed -i 's/📊 //g' "$file"
  
  # Remove house 🏠
  sed -i 's/🏠//g' "$file"
  
  # Remove family 👨‍👩‍👧‍👦
  sed -i 's/👨‍👩‍👧‍👦//g' "$file"
  
  # Remove speech bubble 💬
  sed -i 's/💬 //g' "$file"
  
  # Remove muscle 💪
  sed -i 's/💪//g' "$file"
  
  # Remove rocket 🚀
  sed -i 's/🚀//g' "$file"
  
  # Remove all other common emojis
  sed -i 's/[😀-🙏🌀-🗿🚀-🛿🤀-🧿]//g' "$file"
done

echo "✓ All emojis removed!"
