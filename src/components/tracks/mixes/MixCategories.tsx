import { Mix } from "@/types/mix";
import { MixCategory } from "./MixCategory";
import { MIX_CATEGORIES } from "@/config/mixCategories";

interface MixCategoriesProps {
  mixes: Mix[];
}

export function MixCategories({ mixes }: MixCategoriesProps) {
  return (
    <div className="space-y-8">
      {MIX_CATEGORIES.map((category) => {
        const categoryMixes = mixes.filter(mix => 
          category.types.includes(mix.type)
        );

        if (categoryMixes.length === 0) return null;

        return (
          <MixCategory
            key={category.id}
            label={category.label}
            mixes={categoryMixes}
          />
        );
      })}
    </div>
  );
}