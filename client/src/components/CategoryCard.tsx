import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ExternalLink, Phone } from "lucide-react";
import type { AssistanceProgram } from '@/data/programs';

interface CategoryCardProps {
  title: string;
  icon: string;
  description: string;
  programs: AssistanceProgram[];
  onProgramClick: (programId: string) => void;
  expandedProgram: string | null;
}

export default function CategoryCard({ 
  title, 
  icon, 
  description, 
  programs,
  onProgramClick,
  expandedProgram 
}: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden">
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-right hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="text-sm text-muted-foreground">
              {programs.length} תוכניות
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <div className="text-4xl">{icon}</div>
          </div>
        </div>
      </button>

      {/* Programs List */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50/50">
          <div className="p-4 space-y-3">
            {programs.map((program) => (
              <Card 
                key={program.id}
                className="bg-white"
              >
                <button
                  onClick={() => onProgramClick(program.id)}
                  className="w-full p-4 text-right hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{program.icon}</span>
                        <h4 className="font-bold text-gray-900">{program.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{program.whatIsIt}</p>
                      <p className="text-sm font-semibold text-secondary">{program.howMuch}</p>
                    </div>
                  </div>
                </button>

                {/* Expanded Program Details */}
                {expandedProgram === program.id && (
                  <div className="border-t border-gray-200 p-4 bg-blue-50/50">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">למי זה מתאים?</h5>
                        <p className="text-sm text-foreground">{program.forWhom}</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">איך לבדוק?</h5>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
                          {program.howToCheck.steps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        {program.howToCheck.url && (
                          <a
                            href={program.howToCheck.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button className="w-full">
                              <ExternalLink className="ml-2 h-4 w-4" />
                              פתחו את האתר
                            </Button>
                          </a>
                        )}
                        {program.howToCheck.phone && (
                          <a
                            href={`tel:${program.howToCheck.phone}`}
                            className="flex-1"
                          >
                            <Button variant="outline" className="w-full">
                              <Phone className="ml-2 h-4 w-4" />
                              {program.howToCheck.phoneDisplay || program.howToCheck.phone}
                            </Button>
                          </a>
                        )}
                      </div>

                      {program.howToCheck.hours && (
                        <p className="text-xs text-muted-foreground text-center">
                          שעות פעילות: {program.howToCheck.hours}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
