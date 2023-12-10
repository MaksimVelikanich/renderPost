function closeCommentsSection(postDiv, commentButton, commentInput, publishButton, closeButton) {
    let commentsContainer = postDiv.querySelector('.comments-container');

    commentsContainer.innerHTML = '';

    postDiv.classList.remove('comments-visible');

    commentButton.style.display = 'block';

    commentInput.style.display = 'none';
    publishButton.style.display = 'none';
    closeButton.style.display = 'none';
}
