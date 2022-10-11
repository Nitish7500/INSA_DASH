import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { servicePath } from 'constants/defaultValues';

import ListPageHeading from 'containers/pages/ListPageHeading';
import AddNewModal from 'containers/pages/AddNewModal';
import ListPageListing from 'containers/pages/ListPageListing';
import useMousetrap from 'hooks/use-mousetrap';
import { useHistory, useParams } from 'react-router-dom';
import { getCurrentUser } from 'helpers/Utils';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const apiUrl = `${servicePath}/insurance/`;

// const orderOptions = [
//   { column: 'title', label: 'Product Name' },
//   { column: 'category', label: 'Category' },
//   { column: 'status', label: 'Status' },
// ];

const pageSizes = [10, 20, 50, 100];

// const categories = [
//   { label: 'Cakes', value: 'Cakes', key: 0 },
//   { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
//   { label: 'Desserts', value: 'Desserts', key: 2 },
// ];

const DataListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(10);
  // const [selectedOrderOption, setSelectedOrderOption] = useState({
  //   column: 'policyNumber',
  //   label: 'complaint',
  // });
  let { id } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  // const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  // const [lastChecked, setLastChecked] = useState(null);

  const authorizedUser = getCurrentUser();
  // console.log(authorizedUser.token);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedPageSize
    // , selectedOrderOption
  ]);

  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }
  
  // function capitalizeLetter(string) {
  //   return string.toUpperCase();
  // }
  
  const history = useHistory();
  // console.log(history.location.state);
 
  useEffect(() => {

    let statusLabel = history.location.state;
    let statusFilter = '';
    if(typeof(statusLabel) == 'undefined') {
      // console.log("Status Label :", statusLabel);
      // console.log("status Filter :", statusFilter);
    } else {
      statusFilter = `&status=${statusLabel}`;
      console.log("Status Label :", statusLabel);
      console.log("status Filter :", statusFilter);
    }

    async function fetchData() {
      axios
        .get(
          `${apiUrl}?pageIndex=${currentPage}&pageSize=${selectedPageSize}&keyword=${search}${statusFilter}`,
          // `${apiUrl}?pageIndex=0&pageSize=${selectedPageSize}&orderBy=${selectedOrderOption.column}&keyword=${search}&status=${statusFilter}`,
          {
            headers:{
              Authorization: `${authorizedUser.data.token || authorizedUser.token}`
            }
          }
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          const dataList = data.data.list;
          setTotalPage(Math.floor(data.data.totalRecords/selectedPageSize));
          // console.log(data.data.list)
          setItems(dataList);
          // setSelectedItems([]);
          setTotalItemCount(data.data.totalRecords);
          setIsLoaded(true);
        });
    }
    fetchData();
  }, [selectedPageSize, currentPage, 
    // selectedOrderOption, 
    search,id]);

  // const onCheckItem = (event, id) => {
  //   if (
  //     event.target.tagName === 'A' ||
  //     (event.target.parentElement && event.target.parentElement.tagName === 'A')
  //   ) {
  //     return true;
  //   }
  //   if (lastChecked === null) {
  //     setLastChecked(id);
  //   }

  //   let selectedList = [...selectedItems];
  //   if (selectedList.includes(id)) {
  //     selectedList = selectedList.filter((x) => x !== id);
  //   } else {
  //     selectedList.push(id);
  //   }
  //   setSelectedItems(selectedList);

  //   if (event.shiftKey) {
  //     let newItems = [...items];
  //     const start = getIndex(id, newItems, 'id');
  //     const end = getIndex(lastChecked, newItems, 'id');
  //     newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
  //     selectedItems.push(
  //       ...newItems.map((item) => {
  //         return item.id;
  //       })
  //     );
  //     selectedList = Array.from(new Set(selectedItems));
  //     setSelectedItems(selectedList);
  //   }
  //   document.activeElement.blur();
  //   return false;
  // };

  // const handleChangeSelectAll = (isToggle) => {
  //   if (selectedItems.length >= items.length) {
  //     if (isToggle) {
  //       setSelectedItems([]);
  //     }
  //   } else {
  //     setSelectedItems(items.map((x) => x.id));
  //   }
  //   document.activeElement.blur();
  //   return false;
  // };

  // const onContextMenuClick = (e, data) => {
  //   console.log('onContextMenuClick - selected items', selectedItems);
  //   console.log('onContextMenuClick - action : ', data.action);
  // };

  // const onContextMenu = (e, data) => {
  //   const clickedProductId = data.data;
  //   if (!selectedItems.includes(clickedProductId)) {
  //     setSelectedItems([clickedProductId]);
  //   }

  //   return true;
  // };

  // useMousetrap(['ctrl+a', 'command+a'], () => {
  //   handleChangeSelectAll(false);
  // });

  // useMousetrap(['ctrl+d', 'command+d'], () => {
  //   setSelectedItems([]);
  //   return false;
  // });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <ListPageHeading
        heading="All Complaints"
        displayMode={displayMode}
        changeDisplayMode={setDisplayMode}
        // handleChangeSelectAll={handleChangeSelectAll}
        // changeOrderBy={(column) => {
        //   setSelectedOrderOption(
        //     orderOptions.find((x) => x.column === column)
        //   );
        // }}
        changePageSize={setSelectedPageSize}
        selectedPageSize={selectedPageSize}
        totalItemCount={totalItemCount}
        // selectedOrderOption={selectedOrderOption}
        match={match}
        startIndex={startIndex}
        endIndex={endIndex}
        // selectedItemsLength={selectedItems ? selectedItems.length : 0}
        itemsLength={items ? items.length : 0}
        onSearchKey={(e) => {
          if (e.key === 'Enter') {
            setSearch(e.target.value.toLowerCase());
          }
        }}
        // orderOptions={orderOptions}
        pageSizes={pageSizes}
        toggleModal={() => setModalOpen(!modalOpen)}
      />
      <AddNewModal
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        // categories={categories}
      />
      <ListPageListing
        items={items}
        displayMode={displayMode}
        // selectedItems={selectedItems}
        currentPage={currentPage}
        totalPage={totalPage}
        // onContextMenuClick={onContextMenuClick}
        // onContextMenu={onContextMenu}
        onChangePage={setCurrentPage}
      />
    </>
  );
};

export default DataListPages;
