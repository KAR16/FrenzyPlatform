// Connect with Frenzy App from Firebase
var config = {
  apiKey: "AIzaSyCUqP6x0IvLoT6axpmvD6kRgBgDR2ta_fQ",
  authDomain: "frenesi.firebaseapp.com",
  databaseURL: "https://frenesi.firebaseio.com",
  storageBucket: "project-7399883062634803105.appspot.com",
};
// Connect with Frenzy Dashboard from Firebase
var config2 = {
  apiKey: "AIzaSyCd9OVUg8iEvaKRulLEWPnnqbgO6_V-DSU",
  authDomain: "dashboardfrenzy.firebaseapp.com",
  databaseURL: "https://dashboardfrenzy.firebaseio.com",
  storageBucket: "dashboardfrenzy.appspot.com",
};

var FrenzyApp =  firebase.initializeApp(config);
var FrenzyDashboard = firebase.initializeApp(config2, "Secondary");

var UploadFrenzy = angular.module('UploadFrenzy', ['ui.router']);

UploadFrenzy.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  // States
  .state('home', {
    url: '/home',
    templateUrl: 'templates/Home/homeFrenzy.html',
    controller: 'HomeCtrl'
  })
  // Upload Promotion View
  .state('uploadPromotion', {
    url: '/uploadPromotion',
    templateUrl: "templates/Promotion/promotion.html",
    controller: 'promotionCtrl'
  })
  // Upload Coupon View
  .state('uploadCoupon', {
    url: '/uploadCoupon',
    templateUrl: "templates/Coupon/coupon.html",
    controller: 'CouponCtrl'
  })
  // Upload Customer View
  .state('uploadCustomer', {
    url: '/uploadCustomer',
    templateUrl: "templates/Customer/customer.html",
    controller: 'CustomerCtrl'
  })
  // Loading Page
  .state('loading', {
    url: '/Loading',
    templateUrl: 'templates/Loading/loading.html',
    controller: 'LoadingCtrl'
  })
  // Initial Page
  $urlRouterProvider.otherwise('/Loading');
}) // closes $UploadFrenzy.config()

// Home Controller
UploadFrenzy.controller('HomeCtrl', function($scope, $state) {

  $(window).on('load', function(){
    $state.go('loading')
  });

  $('#frenzySelected').css({
    background: '#00DDC1'
  });

})
// Loading Controller
UploadFrenzy.controller('LoadingCtrl', function($scope, $state) {
  // Loading Function
  setTimeout(function() {
    $('.spinner').hide("slow", function() {
      $('body').append("<div class='BariolBold welcomeMessage'>Bienvenido</div>");
      // When loading finalize then show the home page
      setTimeout(function() {
        $('body').css('background-color','#F1F2F2');
        $('.welcomeMessage').hide();
        // Quit the centered of the elements DOM
        $('html').css({
          display: 'inline-block',
          padding: '0'
        });
        $('.menu').show()
        // $('.generalContainer').show();
        $state.go('home')
      }, 1500);//1500
    });
  }, 4500);//4500

})

// Promotion Controller
UploadFrenzy.controller('promotionCtrl', function($scope, $state) {

  // Get name Image Promotion
  var file;
  var image;

  $('#photoPromotion').bind("change", function(e) {
     var fileUploadControl = $("#photoPromotion")[0];
     file = fileUploadControl.files[0];
     var name = file.name; //This does *NOT* need to be a unique name
     image = name
  });

  // Publication Date Promotion
  $(".form_datetimeInit").datetimepicker({
      format: "dd MM yyyy - HH:ii P",
      showMeridian: true,
      autoclose: true,
      todayBtn: true
  });
  // End Date Promotion
  $(".form_datetimeEnd").datetimepicker({
      format: "dd MM yyyy - HH:ii P",
      showMeridian: true,
      autoclose: true,
      todayBtn: true
  });

  $(window).on('load', function(){
    $state.go('loading')
  });

  $scope.typePromotionValidation = function(promotion) {

    if(promotion.typePromotion == 'directDiscount'){
      $('#basePrice').prop( "disabled", false );
      $('#promotionalPrice').prop( "disabled", false );
      $('#percentageOfDiscount').prop( "disabled", true );
    }
    if(promotion.typePromotion == 'specialPromotion'){
      $('#basePrice').prop( "disabled", true );
      $('#promotionalPrice').prop( "disabled", true );
      $('#percentageOfDiscount').prop( "disabled", true );
    }
    if(promotion.typePromotion == 'percentage'){
      $('#basePrice').prop( "disabled", true );
      $('#promotionalPrice').prop( "disabled", true );
      $('#percentageOfDiscount').prop( "disabled", false );
    }

  }

  // Upload Promotion Function
  $scope.SavePromotion = function(promotion) {

    swal({
      title: 'Listo !!!',
      text: 'Promoción Almacenada Correctamente',
      timer: 3000,
      showConfirmButton: false
    })

    $scope.customer = promotion.customer;
    $scope.provider = promotion.provider;
    $scope.category = promotion.category;
    $scope.categoryProduct = promotion.categoryProduct;
    $scope.subCategory = promotion.subCategory;
    $scope.namePromotion = promotion.namePromotion;
    $scope.presentation = promotion.presentation;
    $scope.promotionDescription = promotion.promotionDescription;
    $scope.basePrice = promotion.basePrice;
    $scope.promotionalPrice = promotion.promotionalPrice;
    $scope.percentageOfDiscount = promotion.percentageOfDiscount;
    $scope.typePromotion = promotion.typePromotion;
    $scope.shopOnline = promotion.shopOnline;
    $scope.termsAndConditions = promotion.termsAndConditions;
    $scope.publicationDate = promotion.publicationDate;
    $scope.endDate = promotion.endDate;
    $scope.status = promotion.status;

    // Validate if the values are undefined
    if($scope.basePrice == undefined){
      $scope.basePrice = 0;
    } else {
      $scope.basePrice = parseInt(promotion.basePrice)
    }
    if($scope.promotionalPrice == undefined){
      $scope.promotionalPrice = 0;
    } else {
      $scope.promotionalPrice = parseInt(promotion.promotionalPrice)
    }
    if($scope.percentageOfDiscount == undefined){
      $scope.percentageOfDiscount = 0;
    } else {
      $scope.percentageOfDiscount = parseInt(promotion.percentageOfDiscount)
    }
    if($scope.shopOnline == undefined){
      $scope.shopOnline = "";
    }
    if($scope.termsAndConditions == undefined){
      $scope.termsAndConditions = "";
    }

    // Validate Status
    if($scope.status == 'true'){
      $scope.status = true;
    }
    if($scope.status == 'false'){
      $scope.status = false;
    }

    $scope.downloadURL = '';

    $scope.UploadNewPromotion = function() {
      var promotionJSONUpload = {};

      var newPostKey = FrenzyApp.database().ref().child('Promotion/').push().key;
      ObjPromo = {
        Customer: [$scope.customer],
        Provider: $scope.provider,
        CategoryApp: $scope.category,
        CategoryProduct: $scope.categoryProduct,
        SubCategory: $scope.subCategory,
        Name: $scope.namePromotion,
        Presentation: $scope.presentation,
        PromotionDescription: $scope.promotionDescription,
        Photo: $scope.downloadURL,
        BasePrice: $scope.basePrice,
        PromotionalPrice: $scope.promotionalPrice,
        Percentage: $scope.percentageOfDiscount,
        TypePromotion: $scope.typePromotion,
        ShopOnline: $scope.shopOnline,
        TermsAndConditions: $scope.termsAndConditions,
        PublicationDate: $scope.publicationDate,
        EndDate: $scope.endDate,
        Status: $scope.status
      }
      promotionJSONUpload[newPostKey] = ObjPromo;
      FrenzyApp.database().ref('Promotion/').update(promotionJSONUpload);
      // Clear Forms
      $('input').val('');
      $('textarea').val('');
      $('select').prop('selectedIndex',0);
    }

    // Upload Image to Firebase and to Get Link Image
    $scope.UploadImage = function() {
      var storageRef = FrenzyApp.storage().ref();
      var uploadTask = storageRef.child('imagePromotion/' + image).put(file);
      uploadTask.on('state_changed', function(snapshot){}, function(error) {
      }, function() {
        $scope.downloadURL = uploadTask.snapshot.downloadURL;
        $scope.UploadNewPromotion();
      });
    }

    if(image == undefined) {
      $scope.downloadURL = "";
      $scope.UploadNewPromotion();
    } else {
      $scope.UploadImage();
    }

  }
})

// Coupon Controller
UploadFrenzy.controller('CouponCtrl', function($scope, $state) {

  // Get name Image Coupon
  var file;
  var image;

  $('#photoCoupon').bind("change", function(e) {
     var fileUploadControl = $("#photoCoupon")[0];
     file = fileUploadControl.files[0];
     var name = file.name; //This does *NOT* need to be a unique name
     image = name
  });

  // Publication Date Coupon
  $(".form_datetimeInit").datetimepicker({
      format: "dd MM yyyy - HH:ii P",
      showMeridian: true,
      autoclose: true,
      todayBtn: true
  });
  // End Date Coupon
  $(".form_datetimeEnd").datetimepicker({
      format: "dd MM yyyy - HH:ii P",
      showMeridian: true,
      autoclose: true,
      todayBtn: true
  });

  $(window).on('load', function(){
    $state.go('loading')
  });

  // Upload Coupon Function
  $scope.SaveCoupon = function(coupon) {

    swal({
      title: 'Listo !!!',
      text: 'Cupon Almacenado Correctamente',
      timer: 3000,
      showConfirmButton: false
    })

    $scope.category = coupon.category;
    $scope.categoryProduct = coupon.categoryProduct;
    $scope.codeCoupon = coupon.codeCoupon;
    $scope.couponDescription = coupon.couponDescription;
    $scope.couponDiscount = coupon.couponDiscount;
    $scope.customer = coupon.customer;
    $scope.endDate = coupon.endDate;
    $scope.nameCoupon = coupon.nameCoupon;
    $scope.presentation = coupon.presentation;
    $scope.provider = coupon.provider;
    $scope.publicationDate = coupon.publicationDate;
    $scope.quantityCoupon = coupon.quantityCoupon;
    $scope.shopOnline = coupon.shopOnline;
    $scope.status = coupon.status;
    $scope.subCategory = coupon.subCategory;
    $scope.termsAndConditions = coupon.termsAndConditions;
    $scope.typeCoupon = coupon.typeCoupon;
    $scope.typeCouponExchange = coupon.typeCouponExchange;

    // Validate if the values are undefined
    if($scope.couponDiscount == undefined){
      $scope.couponDiscount = 0;
    } else {
      $scope.couponDiscount = parseInt(coupon.couponDiscount)
    }
    if($scope.quantityCoupon == undefined){
      $scope.quantityCoupon = 0;
    } else {
      $scope.quantityCoupon = parseInt(coupon.quantityCoupon)
    }
    if($scope.shopOnline == undefined){
      $scope.shopOnline = "";
    }
    if($scope.termsAndConditions == undefined){
      $scope.termsAndConditions = "";
    }

    $scope.downloadURL = '';

    $scope.UploadNewCoupon = function() {
      var couponJSONUpload = {};

      var newPostKey = FrenzyApp.database().ref().child('Coupon/').push().key;
      ObjCoupon = {
        CategoryApp: $scope.category,
        CategoryProduct: $scope.categoryProduct,
        CodeCoupon: $scope.codeCoupon,
        CouponDiscount: $scope.couponDiscount,
        Customer: [$scope.customer],
        EndDate: $scope.endDate,
        Name: $scope.nameCoupon,
        PhotoCoupon: $scope.downloadURL,
        Presentation: $scope.presentation,
        Provider: $scope.provider,
        PublicationDate: $scope.publicationDate,
        QuatityCoupons: $scope.quantityCoupon,
        QuantityExchanged: 0,
        ShopOnline: $scope.shopOnline,
        Status: $scope.status,
        SubCategory: $scope.subCategory,
        TermsAndConditions: $scope.termsAndConditions,
        TypeCoupon: $scope.typeCoupon,
        TypeOfExchange: $scope.typeCouponExchange
      }
      couponJSONUpload[newPostKey] = ObjCoupon;
      FrenzyApp.database().ref('Coupon/').update(couponJSONUpload);

      // Clear Forms
      $('input').val('');
      $('textarea').val('');
      $('select').prop('selectedIndex',0);
    }

    // Upload Image to Firebase and to Get Link Image
    $scope.UploadImage = function() {
      var storageRef = FrenzyApp.storage().ref();
      var uploadTask = storageRef.child('imageCoupon/' + image).put(file);
      uploadTask.on('state_changed', function(snapshot){}, function(error) {
      }, function() {
        $scope.downloadURL = uploadTask.snapshot.downloadURL;
        $scope.UploadNewCoupon();
      });
    }

    if(image == undefined) {
      $scope.downloadURL = "";
      $scope.UploadNewCoupon();
    } else {
      $scope.UploadImage();
    }

  }
})

// Customer Controller
UploadFrenzy.controller('CustomerCtrl', function($scope, $state) {

  // Get name Image Coupon
  var file;
  var image;

  $('#photoCustomer').bind("change", function(e) {
     var fileUploadControl = $("#photoCustomer")[0];
     file = fileUploadControl.files[0];
     var name = file.name; //This does *NOT* need to be a unique name
     image = name
  });

  $(window).on('load', function(){
    $state.go('loading')
  });

  // New Customer Save in Firebase
  $scope.SaveCustomer = function(customer) {

    swal({
      title: 'Listo !!!',
      text: 'Cupon Almacenado Correctamente',
      timer: 4000,
      showConfirmButton: false
    })

    $scope.category = customer.category;
    $scope.nameCustomer = customer.nameCustomer;
    $scope.phoneNumber = customer.phoneNumber;
    $scope.url = customer.url;

    if($scope.phoneNumber == undefined){
      $scope.phoneNumber = "";
    }

    var customerJSONUpload = {};
    $scope.downloadURL = '';

    $scope.saveCustomerFunction = function() {
      setTimeout(function(){
        var newPostKey = FrenzyDashboard.database().ref().child('Customer/').push().key;
        ObjCustomer = {
          AverageSaving: 0,
          CategoryApp: $scope.category,
          Logo: $scope.downloadURL,
          Name: $scope.nameCustomer,
          PhoneNumber: $scope.phoneNumber,
          QuantityCoupon: 0,
          QuantityPromotion: 0,
          URL: $scope.url
        }
        customerJSONUpload[newPostKey] = ObjCustomer;
        FrenzyDashboard.database().ref('Customer/').update(customerJSONUpload);
        // Clear Forms
        $('input').val('');
        $('textarea').val('');
        $('select').prop('selectedIndex',0);
      }, 2000);
    }


    var storageRef = FrenzyDashboard.storage().ref();
    var uploadTask = storageRef.child('imageCustomer/' + image).put(file);
    uploadTask.on('state_changed', function(snapshot){}, function(error) {
    }, function() {
      $scope.downloadURL = uploadTask.snapshot.downloadURL;
      $scope.saveCustomerFunction()
    })

  }
})
