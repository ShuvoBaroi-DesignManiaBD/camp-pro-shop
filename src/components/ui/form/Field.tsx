import React, { ReactElement } from 'react'

const Field = ({label, children, htmlFor, error}:any) => {
    const id = htmlFor || getChildId(children);
  return (
    <div className="flex flex-col items-start justify-start gap-1.5 mt-2 p-0 w-full mr-2">
        {label && <label htmlFor={id} className="textSm mb-1 font-medium">{label}</label>}
        {children}
        {!!error && <div className="text-red-500 text-sm">{error.message}</div>}
    </div>
  )
}

const getChildId = (children:ReactElement) => {
    const child = React.Children.only(children);

    if ("id" in child?.props) {
        return child.props.id;
    }
};

export default Field