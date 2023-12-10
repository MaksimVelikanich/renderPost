document.addEventListener('DOMContentLoaded', function () {
    let savedPosts = JSON.parse(localStorage.getItem('posts')) || [];

    function loadPostsFromLocalStorage() {
        savedPosts.forEach(displayPost);
    }

    function displayPost(post) {
        let postsContainer = document.getElementById('output');

        let postDiv = document.createElement('div');
        postDiv.classList.add('post');

        let postContainer = document.createElement('div');
        postContainer.classList.add('post-container');

        let titleElement = document.createElement('div');
        titleElement.classList.add('post-title');
        titleElement.textContent = post.title;

        let contentElement = document.createElement('div');
        contentElement.classList.add('post-content');
        contentElement.textContent = post.content;
        contentElement.style.marginBottom = '20px';

        postContainer.appendChild(titleElement);
        postContainer.appendChild(contentElement);

        postDiv.appendChild(postContainer);

        let buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'flex-end';
        

        let commentButton = document.createElement('button');
        commentButton.classList.add('comment-button');
        commentButton.textContent = 'Show Comments';
        buttonContainer.appendChild(commentButton);
        postDiv.appendChild(buttonContainer);

        let commentsContainer = document.createElement('div');
        commentsContainer.classList.add('comments-container');
        commentsContainer.style.display = 'none';  
        commentsContainer.style.margin = '20px';
        postDiv.appendChild(commentsContainer);

        let publishButton = document.createElement('button');
        publishButton.classList.add('publish-button');
        publishButton.textContent = 'add comment';
        publishButton.style.display = 'none'; 
        publishButton.style.marginTop = '20px';
        publishButton.style.marginBottom = '20px';
        publishButton.style.marginLeft = '20px';
        publishButton.style.padding = '10px 20px';
        publishButton.style.borderRadius = '5px';
        publishButton.style.backgroundColor = 'rgb(14, 109, 253)';
        publishButton.style.color = 'white';
        publishButton.style.border = 'none';
        publishButton.style.cursor = 'pointer';


        postDiv.appendChild(publishButton);

        let commentInput = document.createElement('input');
        commentInput.classList.add('Comment');
        commentInput.placeholder = 'Enter your comment...';
        commentInput.style.display = 'none'; 
        commentInput.style.marginLeft = '20px';
        commentInput.style.marginTop = '20px';
        publishButton.style.marginBottom = '20px';
        postDiv.appendChild(commentInput);

        let closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.textContent = 'Close';
        closeButton.style.display = 'none'; 
        closeButton.style.marginLeft = '20px';
        closeButton.style.marginTop = '20px';
        closeButton.style.padding = '10px 20px';
        closeButton.style.borderRadius = '5px';
        closeButton.style.backgroundColor = 'gray';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.cursor = 'pointer';

        postDiv.appendChild(closeButton);

        postsContainer.appendChild(postDiv);

        commentButton.addEventListener('click', function () {
            showComments(post, commentsContainer, commentButton, commentInput, publishButton, closeButton);
        });

        publishButton.addEventListener('click', function () {
            publishComment(post, commentInput, commentsContainer, commentButton, publishButton, closeButton);
        });

        closeButton.addEventListener('click', function () {
            closeComments(commentsContainer, commentButton, commentInput, publishButton, closeButton);
        });
    }

    function clearLocalStorage() {
        localStorage.removeItem('posts');

        let postsContainer = document.getElementById('output');
        postsContainer.innerHTML = '';

        savedPosts = [];

        loadPostsFromLocalStorage();
    }

    function showComments(post, commentsContainer, commentButton, commentInput, publishButton, closeButton) {
        commentsContainer.innerHTML = '';
        let commentList = document.createElement('ul');

        for (const comment of post.comments) {
            let commentItem = document.createElement('li');
            commentItem.textContent = comment;
            commentList.appendChild(commentItem);
        }

        if (post.comments.length > 0) {
            let commentsTitle = document.createElement('div');
            commentsTitle.textContent = 'Comments:';
            commentsContainer.appendChild(commentsTitle);

            commentsContainer.appendChild(commentList);
        }

        commentButton.style.display = 'none';

        commentInput.style.display = 'block';
        publishButton.style.display = 'block';
        closeButton.style.display = 'block';
        commentsContainer.style.display = 'block';
    }

    function publishComment(post, commentInput, commentsContainer, commentButton, publishButton, closeButton) {
        let commentText = commentInput.value.trim();
        if (commentText !== '') {
            post.comments.push(commentText);
            savePostToLocalStorage(post);
            showComments(post, commentsContainer, commentButton, commentInput, publishButton, closeButton);
            commentInput.value = '';
        }
    }

    function closeComments(commentsContainer, commentButton, commentInput, publishButton, closeButton) {
        commentsContainer.innerHTML = '';

        commentButton.style.display = 'block';

        commentInput.style.display = 'none';
        publishButton.style.display = 'none';
        closeButton.style.display = 'none';
        commentsContainer.style.display = 'none';
    }

    function savePostToLocalStorage(post) {
        let existingPostIndex = savedPosts.findIndex(p => p.title === post.title && p.content === post.content);
        if (existingPostIndex !== -1) {
            savedPosts[existingPostIndex] = post;
        } else {
            savedPosts.push(post);
        }

        localStorage.setItem('posts', JSON.stringify(savedPosts));
    }

    document.getElementById('clearLocalStorageButton').addEventListener('click', clearLocalStorage);

    loadPostsFromLocalStorage();

    document.getElementById('butom').addEventListener('click', function () {
        let title = document.getElementById('title').value;
        let content = document.getElementById('content').value;

        if (title && content) {
            let existingPost = savedPosts.find(p => p.title === title && p.content === content);
            if (existingPost) {
                alert('Post already exists!');
            } else {
                let newPost = { title, content, comments: [] };
                savePostToLocalStorage(newPost);
                displayPost(newPost);
                document.getElementById('title').value = '';
                document.getElementById('content').value = '';
            }
        } else {
            alert('Please fill in both the title and content fields.');
        }
    });
});
