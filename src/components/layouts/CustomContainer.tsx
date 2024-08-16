
const CustomContainer = ({className, children}:any) => {
    console.log(children);
    
    return (
        <section className={`max-w-screen-xl min-h-[60vh] mx-auto ${className}`}>
            {children}
        </section>
    );
};

export default CustomContainer;