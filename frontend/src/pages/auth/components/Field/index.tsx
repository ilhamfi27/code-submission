import { FC } from 'react';

interface FieldInterface {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  type?: string;
  placeholder?: string;
}

const Field: FC<FieldInterface> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}) => {
  const id = label.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-600 text-sm font-medium mb-1"
      >
        {label}
      </label>
      <input
        type={type ?? 'text'}
        id={id}
        className="w-full border-gray-300 rounded-md p-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => (onChange ? onChange(e.target.value) : undefined)}
      />
    </div>
  );
};

export default Field;
