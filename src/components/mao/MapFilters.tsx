import React from 'react'
import Select from "react-select";
import { selectStyle, selectTheme } from "../../styles/selectStyles";
type Props = {
 setTypeFilter:any,
    typeFilter:any,
    setStateFilter:any
    stateFilter:any
}

function MapFilters({setTypeFilter,typeFilter,setStateFilter,stateFilter}: Props) {
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
    <div className='absolute z-10 flex gap-8 top-3 left-[250px]'>
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
    </div>
  )
}

export default MapFilters