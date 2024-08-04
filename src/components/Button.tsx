interface Props {
  title: string;
  href: string;
  solid: boolean;
  Icon: React.FC;
  width: string;
}

export const Button: React.FC<Partial<Props>> = ({
  title,
  href,
  solid,
  Icon,
  width,
}) => {
  let Component: React.ElementType = href ? "a" : "button";
  const props: {
    href?: string;
  } = {};

  if (href) {
    Component = "a";
    props.href = href;
  }

  if (solid)
    return (
      <Component
        {...props}
        className={`${
          width && `w-[${width}]`
        } text-white font-bold text-[1.4rem] px-[20px] py-[10px] rounded-full bg-[#644646] hover:opacity-90 flex items-center justify-center gap-2`}
      >
        {Icon && <Icon />} {title}
      </Component>
    );

  return (
    <Component
      {...props}
      className={`${
        width && `w-[${width}]`
      } text-[#644646] font-bold text-[1.4rem] px-[20px] py-[10px] rounded-full bg-[#d9d7d4] hover:opacity-90 flex items-center justify-center gap-2`}
    >
      {Icon && <Icon />} {title}
    </Component>
  );
};
