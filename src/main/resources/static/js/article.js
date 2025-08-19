document.addEventListener("DOMContentLoaded", () => {
    const articleIdInput = document.getElementById("article-id");
    const deleteBtn = document.getElementById("delete-btn");

    // 삭제 버튼 처리
    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            const articleId = articleIdInput.value;
            if (!articleId) return;

            if (confirm("정말 삭제하시겠습니까?")) {
                const csrfToken = document.querySelector("meta[name='_csrf']").content;
                const csrfHeader = document.querySelector("meta[name='_csrf_header']").content;

                fetch(`/articles/${articleId}`, {
                    method: "DELETE",
                    headers: {
                        [csrfHeader]: csrfToken
                    }
                }).then(res => {
                    if (res.ok) {
                        alert("삭제되었습니다.");
                        window.location.href = "/articles";
                    } else {
                        alert("삭제 실패");
                    }
                });
            }
        });
    }

    // 새 글/수정 form 제출 처리
    const articleForm = document.querySelector("form");
    if (articleForm) {
        articleForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(articleForm);
            const articleId = articleIdInput ? articleIdInput.value : null;

            const csrfToken = document.querySelector("meta[name='_csrf']").content;
            const csrfHeader = document.querySelector("meta[name='_csrf_header']").content;

            let url = articleForm.action;
            let method = articleId ? "PUT" : "POST";

            fetch(url, {
                method: method,
                headers: {
                    [csrfHeader]: csrfToken
                },
                body: formData
            }).then(res => {
                if (res.ok) {
                    alert(articleId ? "수정 완료" : "글 작성 완료");
                    window.location.href = articleId ? `/articles/${articleId}` : "/articles";
                } else {
                    alert("오류 발생");
                }
            });
        });
    }
});
