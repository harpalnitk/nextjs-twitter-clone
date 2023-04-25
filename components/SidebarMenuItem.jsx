

export default function SidebarMenuItem({text,Icon,active}) {
  return (
    <div className="hoverEffect flex text-gray-700 items-center justify-center xl:justify-start text-lg space-x-3">
        <Icon className='h-7'></Icon>
        <span className={`${active && "font-bold"} hidden xl:inline`}>{text}</span>
    </div>
  )
}
