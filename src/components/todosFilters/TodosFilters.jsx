import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {filtersChanged, queryChange, fetchFilters, selectAll} from "./filtersSlice"
import Spinner from "../spinner/Spinner"
import {store} from "../../store"
import classNames from "classnames";

export const TodosFilters = () => {
  const filters = selectAll(store.getState())

  const {activeFilter, filtersLoadingStatus} = useSelector(state => state.filters)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFilters())
  }, [])

  if (filtersLoadingStatus === "loading") {
    return <Spinner/>;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>
    }

    return arr.map(({id, name}) => {

      const btnClass = classNames("w-40 bg-red-800 py-3 px-4 text-yellow-500 rounded-lg tracking-wide hover:bg-opacity-70 transition duration-500 font-medium capitalize", {
       "border-2 border-yellow-500": name === activeFilter
      });

      return <button
        key={id}
        id={id}
        className={btnClass}
        onClick={() => dispatch(filtersChanged(name))}
      >{name}</button>
    })
  }

  const elements = renderFilters(filters)

  return (
    <div className="flex justify-between border-2 rounded-xl border-red-800 p-4">
      <form>
        <label htmlFor="search"
               className="mb-2 text-sm font-medium text-yellow-900 sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-yellow-500 dark:text-gray-400" fill="none"
                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input type="search" id="search"
                 placeholder="Search..."
                 onChange={(e)=>{
                   dispatch(queryChange(e.target.value))
                 }}
                 className="block w-96 p-4 pl-10 text-sm text-red-800 border border-red-800 rounded-lg placeholder-red-800 bg-gray-50 focus:ring-red-800 focus:border-red-800"
                 />
        </div>
      </form>
        {elements}
    </div>
)
}
