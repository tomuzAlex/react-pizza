import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton: React.FC = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={490}
    viewBox="0 0 280 490"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {/* Кругляшка для анимации пиццы */}
    <circle cx="140" cy="125" r="125" /> 

    {/* Панель названия с отступами и закруглениями */}
    <rect x="0" y="260" rx="10" ry="10" width="280" height="27" />
    
    {/* Панель выбора с отступами и закруглениями */}
    <rect x="0" y="295" rx="10" ry="10" width="280" height="88" />
    
    {/* Панель цены с отступами и закруглениями */}
    <rect x="0" y="430" rx="10" ry="10" width="100" height="30" />
    
    {/* Кнопка добавления с отступами и закруглениями */}
    <rect x="110" y="430" rx="10" ry="10" width="150" height="45" />
  </ContentLoader>
)

export default PizzaSkeleton
