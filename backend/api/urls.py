from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='notes'),
    path('notes/<int:pk>/', views.NoteDelete.as_view(), name="delete_note"),
]