const url = '../docs/pdf.pdf';

let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null;

// const scale = 1.5,
//   canvas = document.querySelector('#pdf-render'),
//   ctx = canvas.getContext('2d');

// // Render the page
// const renderPage = num => {
//   pageIsRendering = true;

//   // Get page
//   pdfDoc.getPage(num).then(page => {
//     // Set scale
//     const viewport = page.getViewport({ scale });

//     console.log(viewport)
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     const renderCtx = {
//       canvasContext: ctx,
//       viewport
//     };

//     page.render(renderCtx).promise.then(() => {
//       pageIsRendering = false;

//       if (pageNumIsPending !== null) {
//         renderPage(pageNumIsPending);
//         pageNumIsPending = null;
//       }
//     });

//     // Output current page
//     document.querySelector('#page-num').textContent = num;
//   });
// };

// // Check for pages rendering
// const queueRenderPage = num => {
//   if (pageIsRendering) {
//     pageNumIsPending = num;
//   } else {
//     renderPage(num);
//   }
// };

// // Show Prev Page
// const showPrevPage = () => {
//   if (pageNum <= 1) {
//     return;
//   }
//   pageNum--;
//   queueRenderPage(pageNum);
// };

// // Show Next Page
// const showNextPage = () => {
//   if (pageNum >= pdfDoc.numPages) {
//     return;
//   }
//   pageNum++;
//   queueRenderPage(pageNum);
// };

// // Get Document
// pdfjsLib
//   .getDocument(url)
//   .promise.then(pdfDoc_ => {
//     pdfDoc = pdfDoc_;

//     document.querySelector('#page-count').textContent = pdfDoc.numPages;

//     renderPage(pageNum);
//   })
//   .catch(err => {
//     // Display error
//     const div = document.createElement('div');
//     div.className = 'error';
//     div.appendChild(document.createTextNode(err.message));
//     document.querySelector('body').insertBefore(div, canvas);
//     // Remove top bar
//     document.querySelector('.top-bar').style.display = 'none';
//   });

// // Button Events
// document.querySelector('#prev-page').addEventListener('click', showPrevPage);
// document.querySelector('#next-page').addEventListener('click', showNextPage);

var thePdf = null;
var scale = 2;

pdfjsLib.getDocument(url).promise.then(function(pdf) {

  thePdf = pdf;
    viewer = document.getElementById('pdf-render');

    for(page = 1; page <= pdf.numPages; page++) {
      canvas = document.createElement("canvas");    
      canvas.className = 'pdf-page-canvas';         
      viewer.appendChild(canvas);            
      renderPage(page, canvas);
    }
});

function renderPage(pageNumber, canvas) {
    thePdf.getPage(pageNumber).then(function(page) {
      viewport = page.getViewport({scale});
      canvas.height = viewport.height;
      canvas.width = viewport.width;          
      page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
});
}