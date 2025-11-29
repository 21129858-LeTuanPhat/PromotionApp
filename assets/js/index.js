let number_grow = 3;
function generateTrees(number_grow) {
  return [
    {
      img: `./assets/img/Trees_texture_shadow/Autumn_tree${number_grow}.png`,
      name: "Autumn tree",
    },
    {
      img: `./assets/img/Trees_texture_shadow/Christmas_tree${number_grow}.png`,
      name: "Christmas tree",
    },
    {
      img: `./assets/img/Trees_texture_shadow/Flower_tree${number_grow}.png`,
      name: "Flower tree",
    },
    {
      img: `./assets/img/Trees_texture_shadow/Fruit_tree${number_grow}.png`,
      name: "Fruit tree",
    },
    {
      img: `./assets/img/Trees_texture_shadow/Moss_tree${number_grow}.png`,
      name: "Moss tree",
    },
    {
      img: `./assets/img/Trees_texture_shadow/Palm_tree1_${number_grow}.png`,
      name: "Palm tree",
    },
    {
      img: `./assets/img/Trees_texture_shadow/Palm_tree2_${number_grow}.png`,
      name: "Palm2 tree",
    },
    {
      img: `./assets/img/Trees_texture_shadow/Snow_christmass_tree${number_grow}.png`,
      name: "Snow christmass tree",
    },
    {
      img: `./assets/img/Trees_texture_shadow/Snow_tree${number_grow}.png`,
      name: "Snow tree",
    },
    {
      img: `./assets/img/Trees_texture_shadow/Tree${number_grow}.png`,
      name: "Tree",
    },
  ];
}
let array_tree = generateTrees(number_grow);

let index = 0;
let time_total = 1500;
let timeLeft = time_total;
let timer = null;
let check = true;
let rate = (1 * 100) / time_total;
let progress = 0;
let mn_savetime = 1500;

$(function () {
  function start() {
    $(".image_treetime_3").attr("src", array_tree[index].img);
    timeChange();
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        timer = null;
        $(".btn-pause").prop("disabled", true);
        $(".btn-start").prop("disabled", true);
        return;
      }
      if (progress >= 50) {
        number_grow = 2;
        array_tree = generateTrees(number_grow);
        $(".image_treetime_3").addClass("image_treetime_2");
        $(".image_treetime_3.image_treetime_2").attr(
          "src",
          array_tree[index].img
        );
      }
      if (progress >= 90) {
        number_grow = 1;
        array_tree = generateTrees(number_grow);
        $(".image_treetime_3").addClass("image_treetime_1");
        $(".image_treetime_3.image_treetime_2.image_treetime_1").attr(
          "src",
          array_tree[index].img
        );
      }

      timeLeft--;
      progress += rate;
      timeChange();
    }, 1000);
  }
  changeTree();
  openModal();
  closeModal();
  function changeTree() {
    $(".image_tree").attr("src", array_tree[index].img);
    $(".list_tree-iconLeft").click(function () {
      index = index - 1;
      if (index < 0) {
        index = array_tree.length - 1;
      }
      $(".image_tree").attr("src", array_tree[index].img);
    });
    $(".list_tree-iconRight").click(function () {
      index = index + 1;
      if (index > array_tree.length - 1) {
        index = 0;
      }
      $(".image_tree").attr("src", array_tree[index].img);
    });
  }
  function openModal() {
    $(".treetime").click(function () {
      $(".modal").css("display", "flex");
    });
  }
  function closeModal() {
    $(".tree_header-icon").click(function () {
      $(".modal").css("display", "none");
    });
  }
  function timeChange() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    $(".timeLift").text(`${minutes}:${seconds}`);
    $(".circular-progress").css("--progress", progress);
  }

  $(".btn-start").click(function () {
    console.log("hello");
    start();
    $(this).prop("disabled", true);
    $(".btn-pause").prop("disabled", false);
    $(".header").css("transform", "translateY(-80px)");
    $(".content").css("padding-top", "0");
  });
  $(".btn-pause").click(function () {
    clearInterval(timer);
    $(".btn-start").prop("disabled", false);
    $(".btn-pause").prop("disabled", true);
    $(".header").css("transform", "translateY(0)");
    $(".content").css("padding-top", "80px");
  });
  $(".btn-reset").click(function () {
    if (timer) {
      clearInterval(timer);
    }
    time_total = mn_savetime;
    timeLeft = time_total;
    rate = (1 * 100) / time_total;
    progress = 0;
    $(".btn-start").prop("disabled", false);
    $(".btn-pause").prop("disabled", true);
    $(".header").css("transform", "translateY(0)");
    $(".content").css("padding-top", "80px");
    number_grow = 3;
    array_tree = generateTrees(number_grow);
    if ($(".image_treetime_3").hasClass("image_treetime_2")) {
      $(".image_treetime_3").removeClass("image_treetime_2");
    }
    if ($(".image_treetime_3").hasClass("image_treetime_1")) {
      $(".image_treetime_3").removeClass("image_treetime_1");
    }
    $(".image_treetime_3").attr("src", array_tree[index].img);
    timeChange();
  });

  // selection time
  $(".list_time-choose li").click(function () {
    $(".list_time-choose li").each(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      }
    });
    $(this).addClass("active");
  });

  //selection tag
  $(".list_tag-choose li").click(function () {
    $(".list_tag-choose li").each(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      }
    });
    $(this).addClass("active");
  });

  $(".btn-save").click(function () {
    $(".list_time-choose li").each(function () {
      if ($(this).hasClass("active")) {
        mn_savetime = parseInt($(this).text());
        $(".timeLift").text(
          (mn_savetime < 10 ? "0" + mn_savetime : mn_savetime) + ":00"
        );
        mn_savetime = mn_savetime * 60;
        time_total = mn_savetime;
        timeLeft = time_total;
        rate = (1 * 100) / time_total;
        progress = 0;
        timeChange();
      }
    });
    $(".list_tag-choose li").each(function () {
      if ($(this).hasClass("active")) {
        $(".tag-choose").text($(this).text());
      }
    });

    $(".image_treetime_3").attr("src", array_tree[index].img);

    $(".modal").css("display", "none");
  });
});
