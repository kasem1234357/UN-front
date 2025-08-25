import React from 'react'
import AleppoMap from '../components/mao/AleppoMap'
import { useGetAllKeysQuery } from '../lib/redux/services/Api'
import Loader from '../components/skeletons/Loader'

type Props = {}

function Map({}: Props) {
  const {data,isLoading,isFetching,isError,isSuccess} = useGetAllKeysQuery('')
  if(isLoading || isFetching){
    return <Loader/>
  }
  if(isError){
    return <h1>Something went wrong</h1>
  }
  return (
    <AleppoMap dataKeys = {data}/>
  )
}

export default Map