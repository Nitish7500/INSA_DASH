import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import DataListView from './DataListView';
import ImageListView from './ImageListView';
import ThumbListView from './ThumbListView';

function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  return (
    <Row>
      {items.map((complaint) => {
        return (
          <DataListView
            key={complaint._id}
            complaint={complaint}
            isSelect={selectedItems.includes(complaint._id)}
            onCheckItem={onCheckItem}
            collect={collect}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(ListPageListing);



// return (
//   <Row>
//     {items.map((complaint) => {
//       if (displayMode === 'imagelist') {
//         return (
//           <ImageListView
//             key={complaint._id}
//             complaint={complaint}
//             isSelect={selectedItems.includes(complaint._id)}
//             collect={collect}
//             onCheckItem={onCheckItem}
//           />
//         );
//       }
//       if (displayMode === 'thumblist') {
//         return (
//           <ThumbListView
//             key={complaint._id}
//             complaint={complaint}
//             isSelect={selectedItems.includes(complaint._id)}
//             collect={collect}
//             onCheckItem={onCheckItem}
//           />
//         );
//       }
//       return (
//         <DataListView
//           key={complaint._id}
//           complaint={complaint}
//           isSelect={selectedItems.includes(complaint._id)}
//           onCheckItem={onCheckItem}
//           collect={collect}
//         />
//       );
//     })}
//     <Pagination
//       currentPage={currentPage}
//       totalPage={totalPage}
//       onChangePage={(i) => onChangePage(i)}
//     />
//     <ContextMenuContainer
//       onContextMenuClick={onContextMenuClick}
//       onContextMenu={onContextMenu}
//     />
//   </Row>
// );