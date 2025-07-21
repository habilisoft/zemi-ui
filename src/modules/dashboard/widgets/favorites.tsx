import { IFavorite } from '@/modules/dashboard/types';
import { Link } from "react-router-dom";


const favorites: IFavorite[] = [
  {
    name: "Nueva Venta",
    icon: "lucide:shopping-cart",
    link: "/sales/sales/new",
  }
]



export const Favorites = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {favorites.map((fav) => (
          <Link key={fav.name} to={fav.link} className="flex items-center space-x-2 p-4 bg-white shadow rounded hover:bg-gray-50 transition-colors">
            <i className={`icon-${fav.icon}`}></i>
            <span>{fav.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
