"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

type ListTrackerProps = {
  title: string;
  description: string;
  data: string[];
};

export function ListTracker({ title, description, data }: ListTrackerProps) {
  const [items, setItems] = useState<string[]>(data);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim() === '' || items.includes(newItem.trim())) return;
    setItems([...items, newItem.trim()]);
    setNewItem('');
  };

  const handleRemoveItem = (itemToRemove: string) => {
    setItems(items.filter(item => item !== itemToRemove));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {items.length > 0 ? (
            items.map(item => (
              <Badge key={item} variant="secondary" className="text-base py-1 pl-3 pr-1">
                {item}
                <button 
                  onClick={() => handleRemoveItem(item)} 
                  className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5"
                  aria-label={`Remove ${item}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No items logged yet.</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Add new item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
          />
          <Button onClick={handleAddItem}>Add</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
