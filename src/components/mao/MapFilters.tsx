import React from 'react'
import Select from "react-select";
import { selectStyle, selectTheme } from "../../styles/selectStyles";
import ExportIcon from "../../assets/icons/ExportIcon";
import ImageIcon from '../global/ImageIcon';
type Props = {
 setTypeFilter:any,
    typeFilter:any,
    setStateFilter:any
    stateFilter:any,
    exportToJsonFile:any
}

function MapFilters({setTypeFilter,typeFilter,setStateFilter,stateFilter,exportToJsonFile}: Props) {
    const TypeOptions = [
        { label:  "كل الحالات", value: "all" },
 { label: "سكني", value: "residence" },
    { label: "تجاري", value: "commerce" },
    { label: "حرفي", value: "handicraft" },
    { label: "ثقافي", value: "culture" },
    { label: "سياحي", value: "tourism" },
    { label: "ديني", value: "religion" },
    { label: "خدمي", value: "service" },
    { label: "صحي", value: "health" },
    { label: "متجر", value: "store" },
    { label: "إداري", value: "administration" },
    { label: "غير معروف", value: "unknown" }
    ]
    const stateOption = [
         { label:  "كل الحالات", value: "all" },
         { label: "مهدد بالانهيار", value: "nearCollapse" },
    { label: "حالة خطرة", value: "riskyCondition" },
    { label: "حالة متوسطة", value: "moderateCondition" },
    { label: "سليم", value: "minor" },
    ]
  return (
    <div className='absolute z-10 flex gap-8 top-3 left-[250px] items-center'>
        <div className='bg-white rounded-lg'>
             <div className='min-w-[150px]' >
                            
                            <Select
                              components={{
                                IndicatorSeparator: () => null,
                              }}
                              styles={selectStyle}
                              classNamePrefix="react-select"
                              theme={selectTheme}
                              options={stateOption}
                              placeholder={'حالة البناء'}
                              onChange={(selected:any) =>
                                setStateFilter(selected.value)

                              }
                            />
                          </div>
        </div>
        <div className='bg-white rounded-lg'>
             <div className='min-w-[150px]' >
                            
                            <Select
                              components={{
                                IndicatorSeparator: () => null,
                              }}
                              styles={selectStyle}
                              classNamePrefix="react-select"
                              theme={selectTheme}
                              options={TypeOptions}
                              placeholder={'نوع المبنى'}
                             
                                 onChange={(selected:any) =>
                                setTypeFilter(selected.value)

                              }
                              
                            />
                          </div>
        </div>
        <button
      className="flex gap-2 items-center bg-[#F3F3F3] dark:bg-primaryLight p-2 rounded-md border border-main-1"
      onClick={() => {
         exportToJsonFile()
      }}
    >
      
        <ImageIcon
          Icon={ExportIcon}
          width={32}
          height={32}
          className="min-w-[32px]"
        />
    
    </button>
    </div>
  )
}

export default MapFilters