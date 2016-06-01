$(function() {
    
    $.pjax({
       area : '.changeContent',   // ← [1] 書き換える範囲の指定 Classは "." IDは "#" 複数指定の場合はカンマで区切る
       link : '.pjaxLink a',      // ← [2] pjaxで処理したいリンク設定
       wait : 300,                // ← [3] クリックしてからの待機時間（アニメーションの時間設定で微調整を）
       load : { script: true }    // ← [4] ページ遷移後のインラインスクリプトを実行可能
   });

   //画面遷移前の表示
   $(document).on('pjax:fetch', function(){
       console.log("フェードアウト(・∀・)");
       $('body').css('overflow', 'hidden');
       $('#fresh__contents').attr({'class': 'fadeOut'});
   });

   //画面遷移後の表示
   $(document).on('pjax:render', function(){
       console.log("フェードイン＼(^o^)／");
       $('#fresh__contents').attr({'class': 'fadeIn'});
       $('body').css('overflow', '');
   });

});
