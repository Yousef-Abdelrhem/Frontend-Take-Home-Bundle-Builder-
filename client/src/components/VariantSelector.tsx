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
          className={`flex h-auto w-fit items-center gap-1 rounded-chip border-[var(--border-chip)] px-[var(--space-chip-px)] py-[var(--space-chip-py)] text-xs transition ${
            activeVariantId === variant.id
              ? 'border-teal-accent bg-teal-accent-light'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          title={variant.label}
        >
          {variant.swatchImage ? (
            <img
              src={variant.swatchImage}
              alt=""
              className="h-[var(--size-swatch)] w-[var(--size-swatch)] flex-shrink-0 rounded-thumb object-cover"
            />
          ) : (
            variant.swatch && (
              <div
                className="h-[var(--size-swatch)] w-[var(--size-swatch)] flex-shrink-0 rounded-thumb"
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
