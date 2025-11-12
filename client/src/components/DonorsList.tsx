import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

/**
 * Donor Recognition Component
 * 
 * This component will display donors who chose to be recognized.
 * Each donor can choose what to display:
 * - name: boolean
 * - photo: string (URL)
 * - business: string
 * - amount: boolean
 * - date: boolean
 * 
 * For now, this is a placeholder. When you have actual donors,
 * you can store their preferences and display them here.
 */

interface Donor {
  id: string;
  // Privacy settings - donor chooses what to show
  showName: boolean;
  name?: string;
  showPhoto: boolean;
  photoUrl?: string;
  showBusiness: boolean;
  businessName?: string;
  showAmount: boolean;
  amount?: number;
  showDate: boolean;
  date?: string;
}

// Example donors (placeholder - replace with real data when available)
const EXAMPLE_DONORS: Donor[] = [
  // {
  //   id: '1',
  //   showName: true,
  //   name: 'משפחת כהן',
  //   showPhoto: false,
  //   showBusiness: false,
  //   showAmount: false,
  //   showDate: true,
  //   date: '2025-01'
  // }
];

export default function DonorsList() {
  // If no donors yet, don't show anything
  if (EXAMPLE_DONORS.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="text-center mb-8">
        <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          תודה לתורמים שלנו 💚
        </h2>
        <p className="text-gray-600">
          אנשים טובים שעוזרים לנו להמשיך לעזור לאחרים
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXAMPLE_DONORS.map((donor) => (
          <Card key={donor.id} className="p-6 hover:shadow-lg transition-shadow">
            {/* Photo */}
            {donor.showPhoto && donor.photoUrl && (
              <div className="flex justify-center mb-4">
                <img
                  src={donor.photoUrl}
                  alt={donor.showName ? donor.name : 'תורם'}
                  className="w-20 h-20 rounded-full object-cover border-2 border-green-200"
                />
              </div>
            )}

            {/* Name */}
            {donor.showName && donor.name && (
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                {donor.name}
              </h3>
            )}

            {/* Business */}
            {donor.showBusiness && donor.businessName && (
              <p className="text-gray-600 text-center mb-2">
                {donor.businessName}
              </p>
            )}

            {/* Amount */}
            {donor.showAmount && donor.amount && (
              <p className="text-green-600 font-bold text-center mb-2">
                תרם {donor.amount.toLocaleString()} ₪
              </p>
            )}

            {/* Date */}
            {donor.showDate && donor.date && (
              <p className="text-sm text-gray-500 text-center">
                {new Date(donor.date).toLocaleDateString('he-IL', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </p>
            )}

            {/* If nothing is shown, just show a heart */}
            {!donor.showName && !donor.showPhoto && !donor.showBusiness && !donor.showAmount && !donor.showDate && (
              <div className="text-center">
                <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-gray-600">תורם אנונימי</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          רוצים להצטרף לרשימה? שלחו לנו הודעה אחרי התרומה 💚
        </p>
      </div>
    </div>
  );
}
