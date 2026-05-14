import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { WritingItem } from "@/data/writing";

export function WritingCard({ item }: { item: WritingItem }) {
  return (
    <Card className="bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-soft">
      <CardContent className="p-6">
        <Badge variant="secondary">{item.status === "draft" ? "Draft" : "Coming soon"}</Badge>
        <h3 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
      </CardContent>
    </Card>
  );
}
