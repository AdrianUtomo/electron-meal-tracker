interface TitleBarProps {
  title: string;
}

export function TitleBar({ title }: TitleBarProps) {
  const handleMinimize = () => {
    window.electron.ipcRenderer.send("window-minimize");
  };

  const handleMaximize = () => {
    window.electron.ipcRenderer.send("window-maximize");
  };

  const handleClose = () => {
    window.electron.ipcRenderer.send("window-close");
  };

  return (
    <div className="flex items-center justify-end w-full h-12 bg-[#fec7cd] border-b-4 border-[#c45363] px-2" style={{ WebkitAppRegion: 'drag' }}>
      <div className="flex gap-2">
        <button onClick={handleMinimize}>minimize</button>
        <button onClick={handleClose}>exit</button>
      </div>
    </div>
    // <div className="flex items-center justify-between w-full h-8 bg-[#fec7cd] border-b-4 border-[#c45363] px-2">
    //   <div className="text-[#8c303f] text-sm font-bold">{title}</div>
    //   <div className="flex gap-2">
    //     <button
    //       onClick={handleMinimize}
    //       className="w-4 h-4 bg-[#fee3e0] border-2 border-[#c45363] hover:bg-[#fec7cd] transition-colors"
    //     />
    //     <button
    //       onClick={handleMaximize}
    //       className="w-4 h-4 bg-[#fee3e0] border-2 border-[#c45363] hover:bg-[#fec7cd] transition-colors"
    //     />
    //     <button
    //       onClick={handleClose}
    //       className="w-4 h-4 bg-[#fee3e0] border-2 border-[#c45363] hover:bg-[#c45363] hover:text-[#fee3e0] transition-colors"
    //     />
    //   </div>
    // </div>
  );
} 