import Select from "react-select"

export default function AutocompleteSearch({ options, id, value, onChange, placeholder }) { 
    return (
        <Select
            classNames={{
                control: () => 'react-select-control ',
                placeholder: () => 'text-sm',
                input: () => 'text-sm',
                singleValue: () => 'text-sm',
                option: () => 'text-sm'
            }}
            isMulti={false}
            styles={{
                control: (base, state) => ({
                    ...base,
                    borderColor: '#e5e5e5',
                    borderWidth: state.isFocused ? '2px' : '1px',
                    paddingInline: '8px ',
                    boxShadow: 'none',
                    height: "42px"
                }),
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 4,
                
                colors: {
                    ...theme.colors,
                    primary25: '#f1f1f1',
                    primary: '#000'
                },
            })}
            id={id}
            options={options}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            formatOptionLabel={(option) => (
                <div className="flex flex-row items-center gap-3">
                    {option?.icon && (
                        <div>{option?.icon}</div>
                    )}
                    <div className="flex gap-[0.25rem] text-[0.825rem]">
                        {option.label}
                    </div>
                </div>
            )}
        />
    )
}