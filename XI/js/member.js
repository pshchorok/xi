function validateForm() {
   const n = document.forms['member']['name'].value;
   if (n == null || n == "") {
      alert('이름을 입력하세요.');
      focusAndSelect('name');
      return false;
   }
   const n1 = document.forms['member']['id'].value;
   if (n1 == null || n1 == "") {
      alert('아이디를 입력하세요.');
      focusAndSelect('id');
      return false;
   };

   let f = document.member;
   const reg_exp = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).{6,15}$");
   const match = reg_exp.exec(f.id.value);

   if (match == null) {
      alert('아이디는 6~15자 이내로 영문과 숫자를 포함해야 합니다.');
      focusAndSelect('id');
      return false;
   };
   const n2 = document.forms['member']['pw'].value;
   if (n2 == null || n2 == "") {
      alert('비밀번호를 입력하세요.');
      focusAndSelect('pw');
      return false;
   };

   const reg_exp1 = new RegExp("^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,15}$");
   const match1 = reg_exp1.exec(f.pw.value);
   if (match1 == null) {
      alert('비밀번호는 6~15자 이내로 영문, 숫자, 특수문자를 포함해야 합니다.');
      focusAndSelect('pw');
      return false;
   };

   const x1 = document.forms['member']['pw'].value;
   const x2 = document.forms['member']['pwch'].value;
   if (x1 != x2) {
      alert('비밀번호가 일치하지 않습니다.');
      focusAndSelect('pwch');
      return false;
   };

   const phoneParts = [
      document.forms['member']['phone_part1'].value,
      document.forms['member']['phone_part2'].value,
      document.forms['member']['phone_part3'].value,
   ];

   for (let i = 0; i < phoneParts.length; i++) {
      if (phoneParts[i] === null || phoneParts[i] === "") {
         alert('전화번호를 입력하세요.');
         focusAndSelect(`phone_part${i + 1}`);
         return false;
      }
   }

   if (phoneParts[0].length !== 3 || phoneParts[1].length !== 4 || phoneParts[2].length !== 4) {
      alert('전화번호 형식을 확인하세요. \n\n ex) 010-1234-5678');
      for (let i = 0; i < phoneParts.length; i++) {
         if (phoneParts[i].length !== (i === 0 ? 3 : 4)) {
            focusAndSelect(`phone_part${i + 1}`);
            return false;
         }
      }
   };
   const selectedValue = document.querySelector('input[name="sms_agree"]:checked');
   if (!selectedValue) {
      alert('SMS 수신 동의 여부를 선택하세요.');
      document.getElementById('ch01').focus();
      return false;
   }
   const email_id = document.forms['member']['email_id'].value;
   if (email_id == null || email_id == "") {
      alert('Email 아이디를 입력하세요.');
      focusAndSelect('email_id');
      return false;
   };
   const emailIdPattern = /^[a-zA-Z0-9._%+-]+$/;
   if (!emailIdPattern.test(email_id)) {
      alert('이메일 아이디는 영문자, 숫자, 특수문자(. _ % + -)만 사용할 수 있습니다.');
      focusAndSelect('email_id');
      return false;
   };
   const email_do = document.forms['member']['email_domain'].value;
   if (email_do == null || email_do == "") {
      alert('도메인을 입력하세요.');
      focusAndSelect('email_domain');
      return false;
   };

   const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
   if (!domainPattern.test(email_do)) {
      alert('도메인 형식을 확인하세요.\n\n ex) naver.com, daum.net');
      focusAndSelect('email_domain');
      return false;
   };

   const selectedValueE = document.querySelector('input[name="E_agree"]:checked');

   if (!selectedValueE) {
      alert('E-mail 수신 동의 여부를 선택하세요.');
      document.getElementById('ch03').focus();
      return false;
   }
   return true;
};

function focusAndSelect(fieldName) {
const field = document.forms['member'][fieldName];
   if (field) {
      field.focus();
      field.select();
   }
}

document.addEventListener('DOMContentLoaded', function () {
   const emailDomainInput = document.getElementById('email_domain');
   const emailSelect = document.getElementById('email_select');
   const form = document.querySelector('form');

   emailSelect.addEventListener('change', function () {
       const selectedValue = emailSelect.value;

       if (selectedValue === "직접입력") {
           emailDomainInput.value = "";
           emailDomainInput.disabled = false;
       } else {
           emailDomainInput.value = selectedValue;
           emailDomainInput.disabled = true;
       }
   });

   form.addEventListener('submit', function () {
       emailDomainInput.disabled = false;
   });
});

document.getElementById('signup-btn').addEventListener('click', () => {
   const currentHash = window.location.hash; // 현재 섹션 해시값 가져오기
   sessionStorage.setItem('currentSection', currentHash); // 해시값 저장
});
// 로그인 패널 및 오버레이 관련
const loginBtn = document.getElementById('login_btn');
const loginPanel = document.getElementById('login');
const closeBtn = document.getElementById('close_btn');
const overlay = document.getElementById('overlay');
const overlay_1 = document.getElementById('overlay_1');

const toggleLoginPanel = (isOpen) => {
   loginPanel.style.transition = 'right 0.5s ease-in-out';
   loginPanel.style.right = isOpen ? '0' : '-520px';
   overlay.classList.toggle('show', isOpen);
};

loginBtn.addEventListener('click', () => toggleLoginPanel(true));
closeBtn.addEventListener('click', () => toggleLoginPanel(false));
overlay.addEventListener('click', () => toggleLoginPanel(false));

// 헤더 확장/축소 관련
const nav = document.querySelector('nav');
const navUl = document.querySelector('nav > ul');


const toggleNavOverlay = (isOpen) => {
   nav.classList.toggle('expanded', isOpen); // 헤더 확장/축소
   overlay_1.classList.toggle('show', isOpen); // 헤더 오버레이 토글
};

navUl.addEventListener('mouseenter', () => toggleNavOverlay(true));
nav.addEventListener('mouseleave', () => toggleNavOverlay(false));



document.addEventListener("DOMContentLoaded", function () {
   const searchPanel = document.getElementById('search');
   const searchBtn = document.getElementById('search_btn'); // 검색 열기 버튼
   const searchCloseBtn = document.getElementById('search_close'); // 검색 닫기 버튼 (있다면)
   const overlays = document.getElementById('overlay'); // 기존 오버레이 활용
   const searchForm = searchPanel.querySelector('form'); // form 요소 선택

   const toggleSearchPanel = (isOpen) => {
       if (isOpen) {
           searchPanel.style.top = '0';
           searchPanel.style.opacity = '1';
           overlays.classList.add('show');
       } else {
           searchPanel.style.opacity = '0';
           overlays.classList.remove('show');

           // ✅ 0.5초 후에 `top: -100%` 적용
           setTimeout(() => {
               searchPanel.style.top = '-100%';
           }, 500);
       }
   };

   // 검색 버튼 클릭 시 검색창 열기
   searchBtn.addEventListener('click', () => toggleSearchPanel(true));

   // 닫기 버튼이 있다면 닫기 이벤트 추가
   if (searchCloseBtn) {
       searchCloseBtn.addEventListener('click', () => toggleSearchPanel(false));
   }

   // 🔥 검색 패널 클릭 시 폼 영역 제외하고 닫기
   searchPanel.addEventListener('click', (event) => {
       if (!searchForm.contains(event.target)) { 
           toggleSearchPanel(false);
       }
   });
});

document.addEventListener("DOMContentLoaded", function () {
   const menuItems = document.querySelectorAll("#ham_menu > ul > li");
   const hamburger = document.getElementById("hamburger");
   
   menuItems.forEach((item) => {
       item.addEventListener("click", function () {
           const subMenu = this.querySelector("ul");

           if (subMenu) {
               const isOpen = this.classList.contains("active");

               // 모든 메뉴 닫기 (다른 메뉴가 열려 있다면 닫아줌)
               menuItems.forEach((el) => {
                   if (el !== this) {
                       el.classList.remove("active");
                       const sub = el.querySelector("ul");
                       if (sub) {
                           sub.style.maxHeight = "0";
                           sub.style.opacity = "0";
                       }
                   }
               });

               // 현재 클릭한 메뉴 열고 닫기
               this.classList.toggle("active", !isOpen);

               if (!isOpen) {
                   subMenu.style.maxHeight = subMenu.scrollHeight + "px"; // 실제 콘텐츠 높이만큼 설정
                   subMenu.style.opacity = "1";
               } else {
                   subMenu.style.maxHeight = "0";
                   subMenu.style.opacity = "0";
               }
           }
       });
   }); 
   document.addEventListener("click", function (event) {
       if (!hamburger.classList.contains("active")) {
           menuItems.forEach((item) => {
               item.classList.remove("active");
               const subMenu = item.querySelector("ul");
               if (subMenu) {
                   subMenu.style.maxHeight = "0";
                   subMenu.style.opacity = "0";
               }
           });
       }
   });
});

document.addEventListener("DOMContentLoaded", function () {
   const hamBtn = document.getElementById("ham_btn");
   const hamburger = document.getElementById("hamburger");
   const overlay = document.getElementById("overlay");
   // 햄버거 메뉴 토글 함수
   const toggleMenu = () => {
       const isActive = hamburger.classList.toggle("active");
       overlay.classList.toggle("show", isActive);
   };
   // 햄버거 버튼 클릭 시 메뉴 열기/닫기
   hamBtn.addEventListener("click", toggleMenu);
   // 오버레이 클릭 시 메뉴 닫기
   overlay.addEventListener("click", () => {
       hamburger.classList.remove("active");
       overlay.classList.remove("show");
   });
});

document.addEventListener("DOMContentLoaded", function () {
   const loginBtn = document.getElementById("login_btn_m");
   const loginPanel = document.getElementById("login");
   const loginClose = document.getElementById("close_btn");
   const overlay = document.getElementById("overlay"); // 오버레이 선택

   const toggleLoginPanel = (isOpen) => {
       loginPanel.style.transition = 'right 0.5s ease-in-out';
       loginPanel.style.right = isOpen ? '0' : '-520px';
       overlay.classList.toggle('show', isOpen);
   };
   loginBtn.addEventListener("click", () => toggleLoginPanel(true));
   loginClose.addEventListener("click", () => toggleLoginPanel(false));
   overlay.addEventListener("click", () => toggleLoginPanel(false));
});

document.addEventListener("DOMContentLoaded", function () {
   const searchPanel = document.getElementById('search');
   const searchBtn = document.getElementById('search_btn_m'); // 검색 열기 버튼
   const overlays = document.getElementById('overlay'); // 기존 오버레이 활용
   const searchForm = searchPanel.querySelector('form'); // form 요소 선택
   const toggleSearchPanel = (isOpen) => {
       if (isOpen) {
           searchPanel.style.top = '0';
           searchPanel.style.opacity = '1';
           overlays.classList.add('show');
       } else {
           searchPanel.style.opacity = '0';
           overlays.classList.remove('show');

           // ✅ 0.5초 후에 `top: -100%` 적용
           setTimeout(() => {
               searchPanel.style.top = '-100%';
           }, 500);
       }
   };

   // 검색 버튼 클릭 시 검색창 열기
   searchBtn.addEventListener('click', () => toggleSearchPanel(true));


   searchPanel.addEventListener('click', (event) => {
       if (!searchForm.contains(event.target)) { 
           toggleSearchPanel(false);
       }
   });
});
document.addEventListener("DOMContentLoaded", function () {
   const searchBtn = document.getElementById('search_btn_m'); // 검색 버튼
   const hamburger = document.getElementById("hamburger"); // 햄버거 메뉴
   const overlay = document.getElementById("overlay"); // 오버레이

   searchBtn.addEventListener('click', () => {
       // 검색창 열 때 햄버거 메뉴가 열려있으면 닫기
       if (hamburger.classList.contains("active")) {
           hamburger.classList.remove("active");
       }
   });
});


