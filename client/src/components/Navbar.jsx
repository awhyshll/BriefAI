function Navbar(){
    return(
        <nav className="bg-blue-200 text-black p-4">
            <div className="container mx-auto flex justify-between items-center">
            <a href="#" className="text-4xl font-bold">BriefAI</a>
                <div className="hidden md:flex space-x-10">
                    <a href="#" className="hover:text-pink-700 text-2xl font-serif">Home</a>
                    <a href="#" className="hover:text-pink-700 text-2xl font-serif">About</a>
                    <a href="#" className="hover:text-pink-700 text-2xl font-serif">Services</a>
                    <a href="#" className="hover:text-pink-700 text-2xl font-serif">Contact Us</a>
                </div>
            </div>
        </nav>  
 
    )
}

export default Navbar;