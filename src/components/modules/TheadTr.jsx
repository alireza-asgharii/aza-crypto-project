
const TheadTr = () => {
  return (
    <tr className="border-t-2 bg-inherit border-t-[#222531] h-[44px] [&_th]:p-2 [&_th]:px-3 text-sm">
      <th className='sticky left-0 z-10 bg-inherit'> </th>
      <th className='md:table-cell hidden'>#</th>
      <th className='text-left  sticky left-[36px] z-10 bg-inherit'>Name</th>
      <th className="min-w-[90px] text-right">Price</th>
      <th className="min-w-[90px] text-right">1h %</th>
      <th className="min-w-[90px] text-right">24h %</th>
      <th className="min-w-[90px] text-right">7d %</th>
      <th className="min-w-[90px] text-right">Volume(24h)</th>
      <th className="min-w-[90px] text-right">Market Cap</th>
      <th className="min-w-[90px] text-right">Circulating Supply</th>
      <th className="min-w-[188px] text-right ">Last 7 Days</th>
      <th className=""></th>
    </tr>
  );
};

export default TheadTr;
