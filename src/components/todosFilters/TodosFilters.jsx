import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {filtersChanged, queryChange, fetchFilters, selectAll} from "./filtersSlice"
import Spinner from "../spinner/Spinner"
import {store} from "../../store"

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

      //const btnClass = classNames('btn', {
      //  'active': item === activeFilter
      //});

      return <button
        key={id}
        id={id}
        //className={btnClass}
        onClick={() => dispatch(filtersChanged(name))}
      >{name}</button>
    })
  }

  const elements = renderFilters(filters)

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(e)=>{
          dispatch(queryChange(e.target.value))
        }}
        />
        {elements}
    </div>
)
}
