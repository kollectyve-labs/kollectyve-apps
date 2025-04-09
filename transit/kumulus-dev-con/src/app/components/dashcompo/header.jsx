
function Header({Title}) {
    return(
        <div className="flex flex-row align-middle bg-white rounded-lg mb-6 place-content-between px-6 py-[11px]">
            <h1 className="text-[1.75em] text-black font-bold">{Title}</h1>
            {/* <button className="bg-[#0066cc] rounded-md text-white font-semibold hover:bg-black px-4 py-2"> Add Infrastructure</button> */}
        </div>
    );
}

export default Header;