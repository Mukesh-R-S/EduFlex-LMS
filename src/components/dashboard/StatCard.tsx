
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard as StatCardType } from "@/types";

interface StatCardProps {
  stat: StatCardType;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const { title, value, change, icon: Icon } = stat;

  return (
    <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {change !== undefined && (
              <p
                className={`text-xs mt-1 flex items-center ${
                  change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {change >= 0 ? "+" : ""}
                {change}%{" "}
                <span className="text-muted-foreground ml-1">from last month</span>
              </p>
            )}
          </div>
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
