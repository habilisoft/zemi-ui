import { IUserCreated } from '@/types';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import { Label } from '@/components/ui/label.tsx';
import { CopyButton } from '@/components/copy-button/copy-button.tsx';

type Props = {
  user: IUserCreated;
}
function UserCreated({
  user
                     } : Props) {

  return (
    <div>
      <ClosableAlert color="success">
        <p>El usuario <strong>{user.username}</strong> para <strong>{user.name}</strong> ha sido creado con éxito.</p>
      </ClosableAlert>

      <div className="space-y-2">
        <div>
          <Label>Usuario</Label>
          <div className="flex items-center space-x-2">
            <CopyButton
              successMessage="Usuario copiado"
              content={user?.username}/>
            <span className="block text-gray-600">{user?.username}</span>
          </div>
        </div>
        <div>
          <Label>Contraseña</Label>
          <div className="flex items-center space-x-2">
            <CopyButton
              successMessage="Contraseña copiada"
              content={user.password || ""}/>
            <span className="block text-gray-600">{user.password}</span>
          </div>
        </div>
        <div>
          <Label>Roles asignados</Label>
          <div className="flex items-center space-x-2">
            {user?.roles?.map((role) => (
             role.name
            )).join(", ")}
          </div>
        </div>
        {user.changePasswordAtNextLogin && <p>El usuario deberá cambiar su contraseña en el próximo inicio de sesión.</p>}
      </div>
    </div>
  )

}

export { UserCreated };
