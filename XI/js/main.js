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

// 메인 섹션 배경/텍스트 애니메이션
const mainSection = document.querySelector('#main');
const mainText = document.querySelector('.main_txt');

const observerOptions = { root: null, threshold: 1 };
const observerCallback = (entries) => {
    entries.forEach(entry => {
        const isVisible = entry.isIntersecting;
        mainSection.classList.toggle('visible', isVisible);
        mainText.classList.toggle('visible', isVisible);
    });
};

new IntersectionObserver(observerCallback, observerOptions).observe(mainSection);

// 풀페이지 스크롤/스와이프 네비게이션
let isSectionScrolling = false;
let activeSectionIndex = 0;
const allSections = document.querySelectorAll('header, section, footer');
const navItems = document.querySelectorAll('#side_nav a');
const totalSectionsCount = allSections.length;

const navigateToSection = (index) => {
    if (index < 0 || index >= totalSectionsCount || isSectionScrolling) return;
    isSectionScrolling = true;
    allSections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeSectionIndex = index;
    highlightActiveNav();

    setTimeout(() => (isSectionScrolling = false), 1300); // 1.3초 유지
};

const highlightActiveNav = () => {
    navItems.forEach((item, idx) => item.classList.toggle('active', idx === activeSectionIndex));
};

const handleScroll = (delta) => {
    if (delta > 0 && activeSectionIndex < totalSectionsCount - 1) {
        navigateToSection(activeSectionIndex + 1);
    } else if (delta < 0 && activeSectionIndex > 0) {
        navigateToSection(activeSectionIndex - 1);
    }
};

window.addEventListener('wheel', (event) => {
    if (!isSectionScrolling) handleScroll(event.deltaY);
});

navItems.forEach((item, idx) =>
    item.addEventListener('click', (event) => {
        event.preventDefault();
        navigateToSection(idx);
    })
);

const observerForSections = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const observedIndex = Array.from(allSections).indexOf(entry.target);
                activeSectionIndex = observedIndex;
                highlightActiveNav();
            }
        });
    },
    { threshold: 1 }
);

allSections.forEach((section) => observerForSections.observe(section));

// 스와이프 지원 (터치 이벤트)
let touchStartY = 0;

window.addEventListener('touchstart', (event) => (touchStartY = event.touches[0].clientY));
window.addEventListener('touchend', (event) => {
    const touchEndY = event.changedTouches[0].clientY;
    if (touchStartY - touchEndY > 50 && activeSectionIndex < totalSectionsCount - 1) {
        navigateToSection(activeSectionIndex + 1);
    } else if (touchEndY - touchStartY > 50 && activeSectionIndex > 0) {
        navigateToSection(activeSectionIndex - 1);
    }
});

// sec2>div 선택
const sec2Div = document.querySelector('#sec2 > div');

// 각 a 요소에 대한 배경 이미지 매핑
const backgroundMap = {
    best_1: './Img/Section/best1_p.jpg',
    best_2: './Img/Section/best2_p.jpg',
    best_3: './Img/Section/best3_p.jpg',
};

// 기본 배경 이미지 (필요 시 설정)
const defaultBackground = './Img/Section/Xi1.jpg';

// 이미지 미리 로드
const preloadImages = (images) => {
    images.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
};

// 모든 이미지 미리 로드
preloadImages(Object.values(backgroundMap).concat(defaultBackground));

// 이벤트 리스너 추가
Object.keys(backgroundMap).forEach((id) => {
    const link = document.getElementById(id);
    link.addEventListener('mouseenter', () => {
        // 해당 id의 배경 이미지로 변경
        sec2Div.style.backgroundImage = `url(${backgroundMap[id]})`;
    });
    link.addEventListener('mouseleave', () => {
        // 기본 배경 이미지로 복원
        sec2Div.style.backgroundImage = `url(${defaultBackground})`;
    });
});

// sec2와 내부 a 요소 선택
const sec2 = document.querySelector('#sec2');
const aElements = document.querySelectorAll('#sec2 > div > a');

// Observer 옵션 및 콜백
const observerOpts = {
    root: null,
    threshold: 1,
};

const onIntersect = (entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aElements.forEach((aElement, idx) => {
                setTimeout(() => {
                    const txt1 = aElement.querySelector('.txt_1');
                    const txt2 = aElement.querySelector('.txt_2');
                    if (txt1) {
                        txt1.style.opacity = '1';
                        txt1.style.transform = 'translate(0)';
                    }
                    if (txt2) {
                        txt2.style.opacity = '1';
                        txt2.style.transform = 'translate(0)';
                    }
                }, idx *300); // 각 a 요소에 0.3초 간격 딜레이
            });
        }
    });
};

// Observer 생성 및 sec2 등록
const sec2Observer = new IntersectionObserver(onIntersect, observerOpts);
sec2Observer.observe(sec2);

const sec3 = document.querySelector('#sec3'); // 섹션 3 선택
const sec3Txt = document.querySelector('.sec3_txt');

// Observer 옵션
const options = {
    root: null, // 뷰포트 기준
    threshold: 0.65, // 65% 이상 보일 때 실행
};

// Observer 콜백 함수
const callback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // 섹션 3에 텍스트 애니메이션과 오버레이 적용
            sec3.classList.add('over-active');
            sec3Txt.classList.add('active');
        } else {
            // 애니메이션 초기화 (필요 시)
            sec3.classList.remove('over-active');
            sec3Txt.classList.remove('active');
        }
    });
};

// Intersection Observer 생성 및 섹션 3 관찰
const observer = new IntersectionObserver(callback, options);
observer.observe(sec3);


const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const sec4 = document.querySelector('#sec4');
let currentIndex = 0; // 현재 슬라이드 인덱스
const slideCount = slides.length;
const intervalTime = 5000; // 5초마다 슬라이드 전환
let autoSlide = null; // 자동 슬라이드 타이머
let isDragging = false; // 드래그 상태
let startX = 0; // 드래그 시작 위치
let currentX = 0; // 드래그 중 위치

slides.forEach((slide) => {
    slide.classList.remove('active'); // 모든 슬라이드의 active 제거
});

// 슬라이드 전환 함수
const moveToSlide = (index) => {
    currentIndex = (index + slideCount) % slideCount; // 인덱스 순환

    // 모든 슬라이드와 인디케이터 초기화
    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentIndex);
    });
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
};

// 자동 슬라이드 시작
const startAutoSlide = () => {
    if (!autoSlide) {
        autoSlide = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, intervalTime);
    }
};

// 자동 슬라이드 중지
const stopAutoSlide = () => {
    clearInterval(autoSlide);
    autoSlide = null;
};

// Intersection Observer 설정
const observer_4 = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                moveToSlide(0); // 첫 번째 슬라이드 표시
                startAutoSlide(); // 자동 슬라이드 시작
                slides[0].classList.add('active'); // 첫 번째 슬라이드 활성화
                observer_4.unobserve(entry.target); // 한 번만 실행
            }
        });
    },
    { threshold: 0.5 } // 50% 이상 보일 때 트리거
);

// 섹션 4 관찰
observer_4.observe(sec4);

// 인디케이터 클릭 이벤트
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide(); // 클릭 시 자동 슬라이드 일시 중지
        moveToSlide(index); // 해당 인덱스로 이동
        startAutoSlide(); // 다시 자동 슬라이드 시작
    });
});

// 터치 슬라이드 이벤트 (모바일)
sec4.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

sec4.addEventListener('touchend', (e) => {
    currentX = e.changedTouches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) { // 터치 움직임이 50px 이상일 경우만 슬라이드 전환
        if (diff > 0) {
            moveToSlide(currentIndex + 1); // 다음 슬라이드
        } else {
            moveToSlide(currentIndex - 1); // 이전 슬라이드
        }
        stopAutoSlide(); // 스와이프 시 자동 슬라이드 중지
        startAutoSlide(); // 자동 슬라이드 다시 시작
    }
});

// 드래그 및 클릭 슬라이드 이벤트 (PC)
sec4.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    stopAutoSlide(); // 드래그 시작 시 자동 슬라이드 중지
});

sec4.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;

    currentX = e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            moveToSlide(currentIndex + 1); // 다음 슬라이드
        } else {
            moveToSlide(currentIndex - 1); // 이전 슬라이드
        }
    } else if (Math.abs(diff) < 10) {
        moveToSlide(currentIndex + 1); // 다음 슬라이드로 이동
    }

    startAutoSlide(); // 드래그 종료 후 자동 슬라이드 다시 시작
});

sec4.addEventListener('mouseleave', () => {
    isDragging = false; // 드래그 도중 마우스가 섹션을 벗어나면 드래그 종료
});


document.addEventListener("DOMContentLoaded", () => {
    const sec5 = document.querySelector("#sec5");

    const observerSec5 = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sec5.classList.add("active"); // 60% 이상 보이면 active 추가
                    observer.unobserve(entry.target); // 한 번만 실행
                }
            });
        },
        { threshold: 0.6 } // 60% 이상 보일 때 트리거
    );

    observerSec5.observe(sec5);
});

document.addEventListener("DOMContentLoaded", () => {
    const sec6 = document.querySelector("#sec6");

    const observerSec6 = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sec6.classList.add("active"); // 60% 이상 보이면 active 추가
                    observer.unobserve(entry.target); // 한 번만 실행
                }
            });
        },
        { threshold: 0.6 } // 60% 이상 보일 때 트리거
    );

    observerSec6.observe(sec6);
});


const slideWrap6 = document.querySelector("#slide_wrap"); 
const slides6 = document.querySelectorAll("#slide_wrap > div");
const leftBtn6 = document.querySelector("#slide .left");
const rightBtn6 = document.querySelector("#slide .right");
const numDisplay6 = document.querySelector("#num");

let currentIndex6 = 0;
const slideWidth6 = slides6[0].offsetWidth + 50; // 슬라이드 너비 + 마진 포함
const totalSlides6 = slides6.length;
let isDragging6 = false;
let startX6 = 0;
let currentX6 = 0;
let isClick6 = true; // 클릭인지 드래그인지 구분

// 트랜지션 효과 추가
slides6.forEach(slide => {
    slide.style.transition = "transform 0.4s ease-in-out"; // 부드러운 이동 효과
});

// 슬라이드 이동 함수
const moveSlide6 = (index) => {
    currentIndex6 = index;
    slides6.forEach((slide, i) => {
        slide.style.transform = `translateX(-${currentIndex6 * slideWidth6}px)`;
    });

    // 현재 슬라이드 번호 업데이트
    numDisplay6.innerHTML = `0${currentIndex6 + 1} <span class="mid">/</span>`;

    // 버튼 활성화/비활성화 업데이트
    leftBtn6.classList.toggle("no", currentIndex6 === 0);
    rightBtn6.classList.toggle("no", currentIndex6 === totalSlides6 - 1);
};

// 버튼 클릭 이벤트 (드래그 감지 X)
leftBtn6.addEventListener("click", () => {
    if (currentIndex6 > 0) {
        moveSlide6(currentIndex6 - 1);
    }
});

rightBtn6.addEventListener("click", () => {
    if (currentIndex6 < totalSlides6 - 1) {
        moveSlide6(currentIndex6 + 1);
    }
});

// 스와이프 & 드래그 이벤트 (클릭과 구분)
slideWrap6.addEventListener("mousedown", (e) => {
    isDragging6 = true;
    startX6 = e.clientX;
    isClick6 = true; // 클릭으로 설정
});

slideWrap6.addEventListener("mousemove", (e) => {
    if (!isDragging6) return;
    currentX6 = e.clientX;

    // 드래그로 일정 거리(10px 이상) 이동하면 클릭이 아님을 판별
    if (Math.abs(startX6 - currentX6) > 10) {
        isClick6 = false; // 드래그로 판별
    }
});

slideWrap6.addEventListener("mouseup", () => {
    if (!isDragging6) return;
    const diff = startX6 - currentX6;

    // 클릭이면 아무 동작 안 함
    if (isClick6) {
        isDragging6 = false;
        return;
    }

    if (Math.abs(diff) > 10) {
        if (diff > 0 && currentIndex6 < totalSlides6 - 1) {
            moveSlide6(currentIndex6 + 1); // 다음 슬라이드
        } else if (diff < 0 && currentIndex6 > 0) {
            moveSlide6(currentIndex6 - 1); // 이전 슬라이드
        }
    }
    isDragging6 = false;
});

// 터치 스와이프 이벤트 (모바일)
slideWrap6.addEventListener("touchstart", (e) => {
    isDragging6 = true;
    startX6 = e.touches[0].clientX;
    isClick6 = true;
});

slideWrap6.addEventListener("touchmove", (e) => {
    if (!isDragging6) return;
    currentX6 = e.touches[0].clientX;

    if (Math.abs(startX6 - currentX6) > 10) {
        isClick6 = false;
    }
});

slideWrap6.addEventListener("touchend", () => {
    if (!isDragging6) return;
    const diff = startX6 - currentX6;

    if (isClick6) {
        isDragging6 = false;
        return;
    }

    if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex6 < totalSlides6 - 1) {
            moveSlide6(currentIndex6 + 1);
        } else if (diff < 0 && currentIndex6 > 0) {
            moveSlide6(currentIndex6 - 1);
        }
    }
    isDragging6 = false;
});

// 마우스가 벗어나면 드래그 해제
slideWrap6.addEventListener("mouseleave", () => {
    isDragging6 = false;
});

// 초기 버튼 상태 설정
moveSlide6(0);


const sections = document.querySelectorAll('#sec3, #sec5, #sec6, #sec7');
const nav_w = document.querySelector('nav');
const sideNav = document.querySelector('#side_nav');

let lastLightSection = null; // 마지막으로 감지된 'light' 섹션 저장

const observer_nav = new IntersectionObserver((entries) => {
    let isLightSectionVisible = false;
    let lastVisibleLightSection = null;

    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            lastVisibleLightSection = entry.target;
            isLightSectionVisible = true;
        }
    });

    if (isLightSectionVisible) {
        nav_w.classList.add('light');
        lastLightSection = lastVisibleLightSection;

        // ✅ sec6, sec7일 때 배경색 변경 & sideNav의 light 속성 제거
        if (lastLightSection.id === 'sec6' || lastLightSection.id === 'sec7') {
            nav_w.style.backgroundColor = '#f4f4f4';
            sideNav.classList.remove('light'); // 🔥 sideNav에서 light 제거
        } else {
            nav_w.style.backgroundColor = ''; // 기본값으로 리셋
            sideNav.classList.add('light'); // 🔥 다른 섹션에서는 다시 light 추가
        }
    } else if (lastLightSection && lastLightSection !== sections[3]) {
        nav_w.classList.remove('light');
        sideNav.classList.remove('light'); // ✅ 전체적으로 sideNav에서 light 제거
        nav_w.style.backgroundColor = ''; // 기본값으로 리셋
        lastLightSection = null;
    }
}, { threshold: 0.6 });

sections.forEach((section) => observer_nav.observe(section));

document.addEventListener("DOMContentLoaded", function () {
    const trigger = document.querySelector(".select-trigger");
    const options = document.querySelector(".select-options");
    const selectWrapper = document.querySelector(".custom-select");

    // 드롭다운 열고 닫기 (애니메이션 적용)
    trigger.addEventListener("click", () => {
        if (selectWrapper.classList.contains("open")) {
            selectWrapper.classList.remove("open");

            // ✅ 애니메이션 후 visibility 숨김 처리 (0.5초 후)
            setTimeout(() => {
                options.style.visibility = "hidden";
            }, 500);
        } else {
            options.style.visibility = "visible";
            selectWrapper.classList.add("open");
        }
    });

    // 옵션 클릭 시 새 탭에서 링크 열기
    document.querySelectorAll(".select-options li").forEach((option) => {
        option.addEventListener("click", function (e) {
            e.stopPropagation(); // 부모 이벤트 방지
            window.open(this.dataset.value, "_blank"); // 새 탭에서 열기
            selectWrapper.classList.remove("open");
        });
    });

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener("click", (e) => {
        if (!selectWrapper.contains(e.target)) {
            selectWrapper.classList.remove("open");
            
            setTimeout(() => {
                options.style.visibility = "hidden";
            }, 500);
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const searchPanel = document.getElementById('search');
    const searchBtn = document.getElementById('search_btn'); // 검색 열기 버튼
    
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

    // 🔥 검색 패널 클릭 시 폼 영역 제외하고 닫기
    searchPanel.addEventListener('click', (event) => {
        if (!searchForm.contains(event.target)) { 
            toggleSearchPanel(false);
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const sections = document.querySelectorAll("#sec3, #sec5");

    const observer = new IntersectionObserver((entries) => {
        let isLightSectionVisible = false;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isLightSectionVisible = true;
            }
        });

        if (isLightSectionVisible) {
            hamburger.classList.add("light");
        } else {
            hamburger.classList.remove("light");
        }
    }, { threshold: 0.6 }); // 60% 이상 보일 때 감지

    sections.forEach(section => observer.observe(section));
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
    const loginPanel_m = document.getElementById("login");
    const loginClose = document.getElementById("close_btn");
    const overlay = document.getElementById("overlay"); // 오버레이 선택

    const toggleLoginPanel = (isOpen) => {
        loginPanel_m.style.transition = 'right 0.5s ease-in-out';
        loginPanel_m.style.right = isOpen ? '0' : '-520px';
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

    searchBtn.addEventListener('click', () => {
        // 검색창 열 때 햄버거 메뉴가 열려있으면 닫기
        if (hamburger.classList.contains("active")) {
            hamburger.classList.remove("active");
        }
    });
});