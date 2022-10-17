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
  // let { id } = useParams();
  // console.log("id",id)
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
  }, [selectedPageSize]);
  
  const history = useHistory();
 
  //fetching sleected filter category through state as being passed through menu.js
  let statusLabel = history.location.state;
  let statusFilter;
  
  if(typeof(statusLabel) == 'undefined') {
    statusFilter = '';
  } else {
    statusFilter = `&status=${statusLabel}`;
  }

  useEffect(() => {
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
          setItems(dataList);
          setTotalItemCount(data.data.totalRecords);
          setIsLoaded(true);
        });
    }
    fetchData();
  }, [selectedPageSize, currentPage, search, statusLabel]);

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  const filter = statusLabel;

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
        filter={filter}
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
