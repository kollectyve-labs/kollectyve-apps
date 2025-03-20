
function Header({Title}) {
    return(
        <div className="bg-white py-[11px] px-6 rounded-lg flex flex-row place-content-between mb-6 align-middle">
            <h1 className=" text-black text-[2em] font-bold">{Title}</h1>
            <button className="px-4 py-2 bg-[#0066cc] text-white font-semibold rounded-md hover:bg-black"> Add Infrastructure</button>
        </div>
    );
}

export default Header;