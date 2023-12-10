export function loadInputData() {
    let savedTitle = localStorage.getItem('savedTitle');
    let savedContent = localStorage.getItem('savedContent');

    if (savedTitle) {
        document.getElementById('title').value = savedTitle;
    }

    if (savedContent) {
        document.getElementById('content').value = savedContent;
    }

}

export function saveInputData(title, content) {
    localStorage.setItem('savedTitle', title);
    localStorage.setItem('savedContent', content);
}

export function addComment(postIndex, commentText) {
    let savedPosts = getSavedPosts();

    if (postIndex >= 0 && postIndex < savedPosts.length) {
        if (!savedPosts[postIndex].comments) {
            savedPosts[postIndex].comments = [];
        }
        savedPosts[postIndex].comments.push(commentText);

        updateLocalStorage(savedPosts);

        return true;
    }

    return false; 
}

export function getComments(postIndex) {
    let savedPosts = getSavedPosts();
    
    if (postIndex >= 0 && postIndex < savedPosts.length) {
        return savedPosts[postIndex].comments || [];
    }

    return []; 
}

export function getSavedPosts() {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
}
function updateLocalStorage(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

