from django.shortcuts import render, redirect
from django.db import IntegrityError
from .models import Appointment, Doctor

def book_appointment(request):
    if request.method == "POST":
        patient_name = request.POST.get('patient_name')
        doctor_id = request.POST.get('doctor')
        date = request.POST.get('date')
        time = request.POST.get('time')
        
        doctor = Doctor.objects.get(id=doctor_id)
        
        try:
            # Attempt to create the appointment
            Appointment.objects.create(
                patient_name=patient_name,
                doctor=doctor,
                date=date,
                time=time
            )
            return redirect('home')  # Redirect to the homepage or confirmation page
        except IntegrityError:
            # Show an error if the doctor is already booked
            error_message = f"Dr. {doctor.name} is already booked on {date} at {time}."
            doctors = Doctor.objects.all()
            return render(request, 'book_appointment.html', {'doctors': doctors, 'error_message': error_message})

    doctors = Doctor.objects.all()
    return render(request, 'book_appointment.html', {'doctors': doctors})
