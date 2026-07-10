import type { Variant } from '../data/catalog';

interface VariantSelectorProps {
  variants: Variant[];
  activeVariantId: string | undefined;
  onSelectVariant: (variantId: string) => void;
}

export default function VariantSelector({
  variants,
  activeVariantId,
  onSelectVariant,
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="flex gap-2">
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onSelectVariant(variant.id)}
          className={`flex items-center gap-2 rounded px-3 py-1 text-sm transition ${
            activeVariantId === variant.id
              ? 'border-2 border-purple-600 bg-purple-50'
              : 'border border-gray-300 hover:border-gray-400'
          }`}
          title={variant.label}
        >
          {variant.swatch && (
            <div
              className="h-4 w-4 rounded-full border border-gray-300"
              style={{ backgroundColor: variant.swatch }}
            />
          )}
          <span>{variant.label}</span>
        </button>
      ))}
    </div>
  );
}
