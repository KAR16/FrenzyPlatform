// Connect with Frenzy App from Firebase
var FrenzyAppConfig = {
  apiKey: "AIzaSyCCkqPKuZh8QtKM_tU2nFDAcjjzufcVX6c",
  authDomain: "frenzyapplication.firebaseapp.com",
  databaseURL: "https://frenzyapplication.firebaseio.com",
  storageBucket: "frenzyapplication.appspot.com",
};


// Connect with Frenzy Dashboard from Firebase
var FrenzyDashboardConfig = {
  apiKey: "AIzaSyDIbQh6IA6D9HHhfogQUZP63omtjwzAiBA",
    authDomain: "frenzydashboard.firebaseapp.com",
    databaseURL: "https://frenzydashboard.firebaseio.com",
    storageBucket: "frenzydashboard.appspot.com",
};

var FrenzyApp =  firebase.initializeApp(FrenzyAppConfig);
var FrenzyDashboard = firebase.initializeApp(FrenzyDashboardConfig, "Secondary");

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
      format: 'dd/mm/yyyy '+'-'+' hh:mm:ss',
      showMeridian: true,
      autoclose: true,
      todayBtn: true,
      language: 'pt-BR'
  });
  // End Date Promotion
  $(".form_datetimeEnd").datetimepicker({
      format: 'dd/mm/yyyy '+'-'+' hh:mm:ss',
      showMeridian: true,
      autoclose: true,
      todayBtn: true,
      language: 'pt-BR'
  });

  $(window).on('load', function(){
    $state.go('loading')
  });

  $scope.typePromotionValidation = function(promotion) {

    if(promotion.typePromotion == 'DirectDiscount'){
      $('#basePrice').prop( "disabled", false );
      $('#promotionalPrice').prop( "disabled", false );
      $('#percentageOfDiscount').prop( "disabled", true );
    }
    if(promotion.typePromotion == 'SpecialPromotion'){
      $('#basePrice').prop( "disabled", true );
      $('#promotionalPrice').prop( "disabled", true );
      $('#percentageOfDiscount').prop( "disabled", true );
    }
    if(promotion.typePromotion == 'Percentage'){
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
      format: 'dd/mm/yyyy '+'-'+' hh:mm:ss',
      showMeridian: true,
      autoclose: true,
      todayBtn: true
  });
  // End Date Coupon
  $(".form_datetimeEnd").datetimepicker({
      format: 'dd/mm/yyyy '+'-'+' hh:mm:ss',
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

    $scope.endDate = moment($scope.endDate).format('DD/MM/YYYY - HH:mm:ss');
    $scope.publicationDate = moment($scope.publicationDate).format('DD/MM/YYYY - HH:mm:ss');

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
      text: 'Customer Almacenado Correctamente',
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
/******************************************************************************************************************/
/*******************************************************************************************************************/
/******************************************************************************************************************/
/*******************************************************************************************************************/
/******************************************************************************************************************/
/*******************************************************************************************************************/

UploadFrenzy.controller('UpdateDatabase', ['$scope', function($scope) {

  /*Variable that save promotion and coupons*/
  $scope.PromotionDatabase = {};
  $scope.CouponDatabase = {};

  /* This scope will save all costumer and your count */
  $scope.CustomerArray;

  /* Variables que cuardaran el conteo de categories */
  $scope.countPromotion;
  $scope.countCoupon;

  $scope.updateCategory = function() {
    FrenzyApp.database().ref('AppCategory').once('value', function(categoryData) {
      for (var x in categoryData.val()) {
        $scope.countCoupon = 0;
        $scope.countPromotion = 0;
        for (var y in $scope.CustomerArray) {
          if (categoryData.val()[x]['CategoryName'] === $scope.CustomerArray[y]['categoryApp']) {
            $scope.countPromotion += $scope.CustomerArray[y]['countPromotion'];
            $scope.countCoupon += $scope.CustomerArray[y]['countCoupon'];
          }
        }

        FrenzyApp.database().ref('AppCategory/'+x).update({
             QuantityCoupon: $scope.countCoupon,
             QuantityPromotion: $scope.countPromotion
        })
      }
    }).then(function() {
      document.getElementById('status').innerHTML='Base de datos actualizada..!!!!'
      console.log("$$ Update Category Finished $$");
    })
  }

  $scope.updateCounts = function() {
    /* Llamamamos loas datos de customer y creamos el json que almancenara los conteos de proomos, cupones y el promedio */
    FrenzyDashboard.database().ref('Customer').once('value', function(customerData) {
      var dictionary = {};
      for (var i in customerData.val()) {
        dictionary[customerData.val()[i]['Name']] = {'countPromotion':0,'countCoupon':0,'average':0,'key':i,'categoryApp':customerData.val()[i]['CategoryApp']}
      }
      $scope.CustomerArray = dictionary;
    }).then(function() {
      /* Lllamamos los datos de promociones y los guardamos en un arreglo local */
      FrenzyApp.database().ref('Promotion').once('value', function(promotionData) {
        for (x in promotionData.val()) {
          if (promotionData.val()[x]['Status'] === true) {
            $scope.PromotionDatabase[x] = promotionData.val()[x];
          }
        }
      }).then(function() {
        /* Llamamos los datos de cupones y los guardamos en un arreglo local */
        FrenzyApp.database().ref('Coupon').once('value', function(couponData) {
          for (y in couponData.val()) {
            if (couponData.val()[y]['Status'] === true) {
              $scope.CouponDatabase[y] = couponData.val()[y];
            }
          }
        }).then(function() {
          /* Recorremos los datos del arreglo de customer para poder calcular los conteos y promedio */
          FrenzyDashboard.database().ref('Customer').once('value', function(customerData) {
            /* Recorremos los datos que se encuentran en firebase. */
            for (var i in customerData.val()) {
              /* Este for recorre coupones para poder contar cuantos cupones tiene cada cliente. */
              for (var x in $scope.CouponDatabase) {
                /* Verifica que el cupon pertenezca al cliente en la pocicion i del for principal */
                if ($scope.CouponDatabase[x]['Customer'][0] === customerData.val()[i]["Name"]) {
                  /* Verifica si es DirectDiscount porque sino no tiene un valor en dinero */
                  if ($scope.CouponDatabase[x]['TypeOfExchange'] === 'DirectDiscount') {
                      /* Actualiza el conteo dentro del arreglo de costumer para cupones */
                      $scope.CustomerArray[customerData.val()[i]["Name"]]['countCoupon'] += 1;
                      /* Se calcula el ahorro y se almacena en average */
                      $scope.CustomerArray[customerData.val()[i]["Name"]]['average'] += $scope.CouponDatabase[x]['CouponDiscount'];
                  } else {
                    /* Actualiza el conteo dentro del arreglo de costumer para cupones */
                    $scope.CustomerArray[customerData.val()[i]["Name"]]['countCoupon'] += 1;
                    /* Se calcula el ahorro y se almacena en average, es cero porque es descuento en porcentaje */
                    $scope.CustomerArray[customerData.val()[i]["Name"]]['average'] = 0;
                  }
                }
              }/* final for de cupones */

              /* Este for recorre promociones para ver cuantas promociones tiene cada cliente */
              for (var x in $scope.PromotionDatabase) {
                  /* Verifica que la promocion pertenezca al cliente en la pocicion i del for principal */
                  if ($scope.PromotionDatabase[x]['Customer'][0] === customerData.val()[i]["Name"]) {
                      /* Actualiza el conteo dentro del arreglo de costumer para promociones */
                      $scope.CustomerArray[customerData.val()[i]["Name"]]['countPromotion'] += 1
                      /* Se calcula el ahorro y se almacena en average */
                      $scope.CustomerArray[customerData.val()[i]["Name"]]['average'] += ($scope.PromotionDatabase[x]['BasePrice'] - $scope.PromotionDatabase[x]['PromotionalPrice'])
                  }
              } /* Final for de promos*/

            }/* Final for de customer en firebase */
            /* Este for recorre los costumer para calcular el promedio de ahorro */
            for (var y in $scope.CustomerArray) {
              if (isNaN($scope.CustomerArray[y]['average'])) {
                $scope.CustomerArray[y]['average'] = 0;
              } else {
                if ($scope.CustomerArray[y]['average'] != 0) {
                  var totalAverage = 0;
                  totalAverage = ($scope.CustomerArray[y]['average'] / ($scope.CustomerArray[y]['countCoupon'] + $scope.CustomerArray[y]['countPromotion']));
                  $scope.CustomerArray[y]['average'] = totalAverage.toFixed(2);
                } else {
                  $scope.CustomerArray[y]['average'] = 0;
                }
              }
            }/* Final for calculo de promedio  */
          }).then(function() {
            /* for que recorre CustomerArray local*/
            for (var y in $scope.CustomerArray) {
              /* Enviamos la llave para entrar a cada uno de los customer en firebase */
              FrenzyDashboard.database().ref('Customer/'+$scope.CustomerArray[y]['key']).update({
                AverageSaving: $scope.CustomerArray[y]['average'],
                QuantityCoupon: $scope.CustomerArray[y]['countCoupon'],
                QuantityPromotion: $scope.CustomerArray[y]['countPromotion'],
              })
            }
            document.getElementById('status').innerHTML='Actulizacion de conteo por customer terminado'
            console.log("## Update Finished ##");
            $scope.updateCategory();
          })
        });
      });
    });
  }

  $scope.shutdownPromotion = function() {



    /*  Tomamos la fecha actual de Guatemala */
    $scope.fechaActual = moment.tz('America/Guatemala').format('x');

    /* Llamamos las promociones que estan en firebase */
    FrenzyApp.database().ref('Promotion').once('value', function(promotionData) {

      /* Recorremos las promociones que estan en firebase */
      for (var z in promotionData.val()) {
        /* Convertimos la de finalizacion de las promociones que esta en firebase */
        var fechaFinal =  new Date(moment(promotionData.val()[z]['EndDate'], 'DD/MM/YYYY HH:mm:ss'));
        /* Convertimos la fecha a milisegundos */
        fechaFinal = moment(fechaFinal).format('x');

        /* verificamos si la fecha de finalizacion es mayor a la fecha Actual
          de ser asi la promocion tiene que estar activa. */
        if (fechaFinal > $scope.fechaActual) {
          /* Enviamos la llave para entrar a cada uno de las promociones en firebase y dar de alta la promo*/
          FrenzyApp.database().ref('Promotion/'+ z).update({
            Status: true
          })
        } else {
          /* Enviamos la llave para entrar a cada uno de las promociones en firebase y dar de baja la promo*/
          FrenzyApp.database().ref('Promotion/'+ z).update({
            Status: false
          })
        }
      }/* final for verificacion de EndDate */

      /* Recorremos las promociones que estan en firebase */
      for (var a in promotionData.val()) {
        /* Convertimos la de finalizacion de las promociones que esta en firebase */
        var fechaPublicacion =  new Date(moment(promotionData.val()[a]['PublicationDate'], 'DD/MM/YYYY HH:mm:ss'));
        /* Convertimos la fecha a milisegundos */
        fechaPublicacion = moment(fechaFinal).format('x');

        /* verificamos si la fecha de publicacion es mayor a la fecha Actual
          de ser asi la promocion tiene que estar activa. */
        if (fechaPublicacion > $scope.fechaActual) {
          /* Enviamos la llave para entrar a cada uno de las promociones en firebase y dar de alta la promo*/
          FrenzyApp.database().ref('Promotion/'+ z).update({
            Status: false
          })
        } else {
          /* Enviamos la llave para entrar a cada uno de las promociones en firebase y dar de baja la promo*/
          FrenzyApp.database().ref('Promotion/'+ z).update({
            Status: true
          })
        }
      }/* final for verificacion de PublicationDate */

    }).then(function() {
      document.getElementById('status').innerHTML='Dando de baja Promociones'
        console.log("XXX Shutdown Finished XXX");
        $scope.updateCounts();
    });

  }
}]);
