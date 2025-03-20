import Statcard from "./stats/statcard";

function Stats() {
    return(
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[24px] mb-6">
        <Statcard title="Web Application" percentage1="45" percentage2="62"/>
        <Statcard title="Database Server" percentage1="78" percentage2="85" />
        <Statcard title="API Service" percentage1="30" percentage2="40" />
        </div>
    );
}

export default Stats;
