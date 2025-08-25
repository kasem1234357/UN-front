import React, { useState } from "react";

import { coulmnsType, DictionaryType } from "../types";
import { useGetDictionary } from "../hooks/useGetDictionary";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserSliceType } from "../lib/redux/slices/userSlice";
import { useGetAllPrivateCoachesQuery } from "../lib/redux/services/sections/Coaches";
import { useDebounce } from "../hooks/useDebounce";
import SkeletonTable from "../components/skeletons/SkeletonTable";

import Pagination from "../components/global/Pagination";
import RowsPerPageSelect from "../components/global/RowsPerPageSelect";
import Header from "../components/users/Header";
import UsersTable from "../components/users/UsersTable";
import { useGetAllOrdersQuery, useGetAllStaticsQuery, useGetAllUsersQuery } from "../lib/redux/services/Api";
// import PrivateCoachingTable from "../../components/coaches/privateCoaching/PrivateCoachingTable";


type Props = {};
const renderTable = (props: any) => {
  if (props.isLoading || props.isFetching) {
    return <SkeletonTable />;
  }
  // if (props.isError) {

  //   return <div>error</div>;
  // }
  return (
    <UsersTable
      data={props.data}
      columns={props.columns}
      clubId={props.clubId}
      limitedFields={props.limitedFields}
      setOpenModal={props.setOpenModal} selectedCalenderSlot={props.selectedCalenderSlot}  setSelectedCalenderSlot={props.setSelectedCalenderSlot}
    />
  );
};
function Review({}: Props) {
  const { Auth, inputs, courts, shared, coaches }: DictionaryType =
    useGetDictionary();
  const [currentPage, setCurrentPage] = useState(1);
  const [limitedFields, setLimitedFields] = useState<string[]>([]);
 const [openModel,setOpenModal] = useState<boolean>(false)
    const [selectedCalenderSlot,setSelectedCalenderSlot] = useState<any>(null)
  const [filter, setFilter] = useState<Object>({});
  const [limit, setLimit] = useState(10);
  const handleRowsChange = (value: number) => {
    setLimit(value);
  };

  const columns: coulmnsType = [
    {
      title: 'اسم المنطقة',
      tag: "areaName",
    },
     
    {
      title:'المهندس المفيم',
      tag: "reviewer",
    },
    {
      title: 'تاريخ التقيم',
      tag: "createdAt",
    },
    {
      title: 'رمز المبنى',
      tag: "polygonId",
    },
    {
      title: "نوع مادة البناء",
      tag: "constructionType",
    },
    
    {
        title:"نوع المبنى",
        tag:"function"
    },
    {
      title: 'حالة البناء',
      tag: "buildingStatus",
    },
    {
      title: "",
      tag: "controll",
    },
  ];
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const clubId = useSelector(
    (state: { user: UserSliceType }) => state.user.selectedClub
  );
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAllStaticsQuery({
     
      name: useDebounce(search),
      limit: limit,
      currentPage,
      ...filter,
    });
  return (
    <section className="w-full flex flex-col gap-4 overflow-hidden min-h-[600px]">
      <Header
        data={data?.dataList}
        id={clubId}
        setSearch={setSearch}
        setFilter={setFilter}
        filter={filter}
        search={search}
        setLimitedFields={setLimitedFields}
         setOpenModal={setOpenModal}
        selectedCalenderSlot={selectedCalenderSlot} 
        setSelectedCalenderSlot={setSelectedCalenderSlot}
      />
      {/* table section */}

      {renderTable({
        isLoading: isLoading,
        isFetching: isFetching,
        isError: isError,
        data: data,
        columns: columns,
        limitedFields: limitedFields,
         setOpenModal:setOpenModal,
         selectedCalenderSlot:selectedCalenderSlot,
         setSelectedCalenderSlot:setSelectedCalenderSlot,
        clubId: clubId,
      })}
      <div className=" flex flex-row justify-between items-center w-full pb-4">
        <RowsPerPageSelect
          options={[10, 25, 50, 100]}
          value={limit}
          onChange={handleRowsChange}
          total={data?.pagging?.total}
        />

        <div className="w-full flex justify-end items-end">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data ? data?.pagging?.total : []}
            pageSize={limit}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </div>
      </div>

    </section>
  );
}

export default Review;

