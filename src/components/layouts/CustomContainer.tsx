
const CustomContainer = ({className, children}:any) => {
    
    return (
        <section className={`max-w-screen-xl min-h-[60vh] mx-auto ${className}`}>
            {children}
        </section>
    );
};

export default CustomContainer;