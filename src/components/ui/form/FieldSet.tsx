const FieldSet = ({label, children}:any) => {
  return (
    <fieldset className="my-1 border-none p-0">
        {label && <legend className="text-base font-bold mb-2">{label}</legend>}
        <div className="flex flex-col justify-between self-start">{children}</div>
    </fieldset>
  )
}

export default FieldSet