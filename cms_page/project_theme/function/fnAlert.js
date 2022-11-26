

var Toast = Swal.mixin({
    toast: true,
    position: 'top-center',
    showConfirmButton: false,
    timer: 3000
});

//function sweetConfirm(title, message, callback) {
//    Swal.fire({
//        title: title,
//        text: message,
//        type: 'warning',
//        showCancelButton: true
//    }).then((confirmed) => {
//        callback(confirmed && confirmed.value == true);
//    });
//}

    //CheckConfrim(message, function (confirmed) {
    //    if (confirmed) {
    //        debugger;
    //        return true;
    //    }
    //    else {
    //        return false;
    //    }
    //});

function alertConfrim(message, callback) {
        Swal.fire({
            title: message,
            icon: 'question',
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                //cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            }
        }).then((confirmed) => {
            callback(confirmed && confirmed.value == true);
        });
        //    .then((result) => {
        //    if (result.isConfirmed) {
        //        Swal.fire('Saved!', '', 'success')
        //    } 
        //});
    }

    function alertSuccess(message) {
        Swal.fire({
            title: message,
            text: '',
            icon: 'success',
            confirmButtonText: 'OK'
        })
    }

    function alertError(message) {
        Swal.fire({
            title: message,
            text: '',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }

    function alertSuccessNoti(message) {
        Toast.fire({
            icon: 'success',
            title: message
        })
    }


    function alertInfoNoti(message) {
        Toast.fire({
            icon: 'info',
            title: message
        })
    }

    function alertErrorNoti(message) {
        Toast.fire({
            icon: 'error',
            title: message
        })
    }

    function alertQuestion(message) {
        Toast.fire({
            icon: 'question',
            title: message
        })
    }



//$(function () {
//    var Toast = Swal.mixin({
//        toast: true,
//        position: 'top-end',
//        showConfirmButton: false,
//        timer: 3000
//    });

//    $('.swalDefaultSuccess').click(function () {
//        Toast.fire({
//            icon: 'success',
//            title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.swalDefaultInfo').click(function () {
//        Toast.fire({
//            icon: 'info',
//            title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.swalDefaultError').click(function () {
//        Toast.fire({
//            icon: 'error',
//            title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.swalDefaultWarning').click(function () {
//        Toast.fire({
//            icon: 'warning',
//            title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.swalDefaultQuestion').click(function () {
//        Toast.fire({
//            icon: 'question',
//            title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });

//    $('.toastrDefaultSuccess').click(function () {
//        toastr.success('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
//    });
//    $('.toastrDefaultInfo').click(function () {
//        toastr.info('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
//    });
//    $('.toastrDefaultError').click(function () {
//        toastr.error('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
//    });
//    $('.toastrDefaultWarning').click(function () {
//        toastr.warning('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
//    });

//    $('.toastsDefaultDefault').click(function () {
//        $(document).Toasts('create', {
//            title: 'Toast Title',
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.toastsDefaultTopLeft').click(function () {
//        $(document).Toasts('create', {
//            title: 'Toast Title',
//            position: 'topLeft',
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.toastsDefaultBottomRight').click(function () {
//        $(document).Toasts('create', {
//            title: 'Toast Title',
//            position: 'bottomRight',
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.toastsDefaultBottomLeft').click(function () {
//        $(document).Toasts('create', {
//            title: 'Toast Title',
//            position: 'bottomLeft',
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.toastsDefaultAutohide').click(function () {
//        $(document).Toasts('create', {
//            title: 'Toast Title',
//            autohide: true,
//            delay: 750,
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.toastsDefaultNotFixed').click(function () {
//        $(document).Toasts('create', {
//            title: 'Toast Title',
//            fixed: false,
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.toastsDefaultFull').click(function () {
//        $(document).Toasts('create', {
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
//            title: 'Toast Title',
//            subtitle: 'Subtitle',
//            icon: 'fas fa-envelope fa-lg',
//        })
//    });
//    $('.toastsDefaultFullImage').click(function () {
//        $(document).Toasts('create', {
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
//            title: 'Toast Title',
//            subtitle: 'Subtitle',
//            image: '../../dist/img/user3-128x128.jpg',
//            imageAlt: 'User Picture',
//        })
//    });
//    $('.toastsDefaultSuccess').click(function () {
//        $(document).Toasts('create', {
//            class: 'bg-success',
//            title: 'Toast Title',
//            subtitle: 'Subtitle',
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.toastsDefaultInfo').click(function () {
//        $(document).Toasts('create', {
//            class: 'bg-info',
//            title: 'Toast Title',
//            subtitle: 'Subtitle',
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.toastsDefaultWarning').click(function () {
//        $(document).Toasts('create', {
//            class: 'bg-warning',
//            title: 'Toast Title',
//            subtitle: 'Subtitle',
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.toastsDefaultDanger').click(function () {
//        $(document).Toasts('create', {
//            class: 'bg-danger',
//            title: 'Toast Title',
//            subtitle: 'Subtitle',
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//    $('.toastsDefaultMaroon').click(function () {
//        $(document).Toasts('create', {
//            class: 'bg-maroon',
//            title: 'Toast Title',
//            subtitle: 'Subtitle',
//            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
//        })
//    });
//});
