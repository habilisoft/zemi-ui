import * as Tooltip from '@radix-ui/react-tooltip';
import { IUser } from '@/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  user: IUser;
}

function UserRolesCell(
  {
    user
  }: Props
) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-fit">
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root open={open}>
          <Tooltip.Trigger
            onClick={() => setOpen(!open)}
            asChild>
            <div className="cursor-pointer underline decoration-dashed underline-offset-4">
              {user.roles?.length || 0}
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="bottom"
              className=" p-4 border border-gray-200 shadow rounded-none"
              sideOffset={5}>
              <h3 className="text-sm font-bold text-gray-700">Roles asignados al usuario</h3>
              <ul className="list-disc list-inside">
                {user.roles.map(role => <li key={role.id}>
                  <Link
                    to={`/access-control/roles/${role.id}/details`}
                    className="link text-xs">{role.name}
                  </Link></li>)}
              </ul>
              <Tooltip.Arrow className="TooltipArrow"/>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  )
}

export { UserRolesCell }
