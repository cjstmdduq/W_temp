(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var hamburger = document.querySelector('.hamburger');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      nav.setAttribute('aria-hidden', nav.classList.contains('is-open') ? 'false' : 'true');
    });

    document.querySelectorAll('.nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        nav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 상담접수 폼 제출 시 배송 신청 모달 열기
  var consultForm = document.getElementById('consult-form');
  var modal = document.getElementById('delivery-modal');
  var modalBackdrop = modal && modal.querySelector('.modal-backdrop');
  var modalClose = modal && modal.querySelector('.modal-close');
  var modalSubmitBtn = document.getElementById('modal-submit-btn');
  var storedSubmit = { type: '', phone: '' };

  function openModal() {
    if (!modal) return;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  if (consultForm && modal) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var phone = (consultForm.querySelector('[name="phone"]') || {}).value || '';
      var type = (consultForm.querySelector('[name="type"]') || {}).value || '';
      var name = (consultForm.querySelector('[name="name"]') || {}).value || '';

      if (!phone.trim()) {
        alert('연락처를 입력해 주세요.');
        return;
      }
      if (!type) {
        alert('문의 유형을 선택해 주세요.');
        return;
      }

      storedSubmit.type = type;
      storedSubmit.phone = phone;
      storedSubmit.name = name;
      openModal();
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  if (modalSubmitBtn) {
    modalSubmitBtn.addEventListener('click', function () {
      var masked = (storedSubmit.phone || '').replace(/(\d{3})-?(\d{3,4})-?(\d{4})/, function (_, a, b, c) {
        return a + '-****-' + c;
      });
      alert('접수되었습니다. (유형: ' + (storedSubmit.type || '—') + ' / 연락처: ' + (masked || '—') + ')');
      closeModal();
    });
  }

  // 모달 내 배송 수단/옵션/물품 선택 시 사이드바 문구 갱신
  var sidebarMethod = document.getElementById('sidebar-method');
  var sidebarSize = document.getElementById('sidebar-size');
  if (modal) {
    modal.addEventListener('change', function (e) {
      var t = e.target;
      if (t.name === 'modal-method' && t.checked && sidebarMethod) {
        var speed = (modal.querySelector('input[name="modal-speed"]:checked') || {}).value || '일반';
        sidebarMethod.textContent = t.value + ' - ' + speed;
      }
      if (t.name === 'modal-speed' && t.checked && sidebarMethod) {
        var method = (modal.querySelector('input[name="modal-method"]:checked') || {}).value || '오토바이 퀵';
        sidebarMethod.textContent = method + ' - ' + t.value;
      }
      if (t.name === 'modal-size' && t.checked && sidebarSize) {
        var labels = { '초소형': '초소형 (예. 휴대폰)', '소형': '소형 (예. A4박스)', '중형': '중형 (예. 라면박스)', '대형': '대형 (예. 가구, 자전거)' };
        sidebarSize.textContent = labels[t.value] || t.value;
      }
    });
  }

  // 탭 클릭 시 활성 표시만 (내용 전환 없음)
  var tabs = document.querySelectorAll('.modal-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
    });
  });
})();
