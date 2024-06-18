import { Button } from '@/components/ui/button.tsx';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { MenuItem } from '@/types';
import { NavLink } from 'react-router-dom';
import { MdArrowRight } from 'react-icons/md';

function CollapsibleMenuItem({ item }: { item: MenuItem}) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (item.children) {
      item.children.forEach((child) => {
        if (child.path === window.location.pathname) {
          setIsOpen(true);
        }
      });
    }
  }, []);
  return (
    <div>
      <Button
        variant="link"
        className="flex items-center font-bold hover:no-underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdArrowRight
          size={18}
          className={cn("-ml-4", {
            "transform rotate-90": isOpen,
          })}
        />
        {item.title}
      </Button>
      {(isOpen && item.children) && (
        <div className="pl-4">
          {item.children.map((subItem: MenuItem) => (
            <NavLink
              to={subItem.path || ""}
              key={subItem.title}
              className="block w-full text-left rounded-none nav-item"
            >
              {subItem.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default CollapsibleMenuItem;
