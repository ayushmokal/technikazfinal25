import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/types/blog";
import { UseFormReturn } from "react-hook-form";
import type { BlogFormData } from "@/types/blog";

interface SubcategorySelectProps {
  form: UseFormReturn<BlogFormData>;
  selectedCategory: string;
}

export function SubcategorySelect({ form, selectedCategory }: SubcategorySelectProps) {
  return (
    <FormField
      control={form.control}
      name="subcategory"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Subcategory</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={!selectedCategory}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a subcategory" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selectedCategory &&
                categories[selectedCategory as keyof typeof categories]?.map(
                  (subcategory) => (
                    <SelectItem key={subcategory} value={subcategory}>
                      {subcategory}
                    </SelectItem>
                  )
                )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}