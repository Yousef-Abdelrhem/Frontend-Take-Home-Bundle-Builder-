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
          className={`flex h-auto w-fit items-center gap-1 rounded-[2px] border-[0.5px] px-[3px] py-[1px] text-xs transition ${
            activeVariantId === variant.id
              ? 'border-[#0AA288] bg-[#1DF0BB0A]'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          title={variant.label}
        >
          {variant.swatchImage ? (
            <img
              src={variant.swatchImage}
              alt=""
              className="h-[28px] w-[28px] flex-shrink-0 rounded-[5px] object-cover"
            />
          ) : (
            variant.swatch && (
              <div
                className="h-[28px] w-[28px] flex-shrink-0 rounded-[5px]"
                style={{ backgroundColor: variant.swatch }}
              />
            )
          )}
          <span className="truncate">{variant.label}</span>
        </button>
      ))}
    </div>
  );
}
